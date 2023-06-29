const fs = require("fs");
const EventEmitter = require("eventemitter3");
const { parseVintedURL, search, fetchCookie } = require("./index");
const Map = require("collections/map");

class VintedViewver extends EventEmitter {
  constructor(obj) {
    super();

    this.url = obj?.url;
    this.dbpath = obj?.dbpath;
    this.interval = obj?.interval ?? 5000;
    this.debug = obj?.debug ?? false;
    this.proxy = this.#proxy(obj?.proxy) ?? false;
    this.db = new Map();
    this.#init();
  }

  #init() {
    let self = this;
    let url = this.url;
    let parsedURL = parseVintedURL(url);
    let validURL = parsedURL.validURL;
    let domain = parsedURL.domain;
    let querystring = parsedURL.querystring;
    if (!validURL) this.emit("error", "Invalid URL");
    else {
      if (this.debug) console.log(`Recherche lancer sur : ${url}`);
      this.#search();
    }
  }
  #proxy(listOrFile) {
    if (!listOrFile) return;
    if (typeof listOrFile === "object" && Array.isArray(listOrFile))
      return listOrFile;
    else if (fs.existsSync(listOrFile)) {
      return fs.readFileSync(listOrFile)?.split("\n");
    } else return;
  }
  #search() {
    return new Promise(async (resolve) => {
      try {
        const db = this.db;
        const url = this.url;

        setTimeout(() => this.#search(), this.interval);
        const result = await search(
          url,
          false,
          false,
          {
            per_page: "20",
          },
          this.proxy
        );

        if (this.debug) {
          try {
            fs.writeFileSync("debug.json", JSON.stringify(result));
          } catch (e) {
            console.log(JSON.stringify(result), e);
          }
        }
        if (!result.items) return resolve();
        const isFirstSync = db.get(`first`);
        const lastItemTimestamp = db.get(`last`);
        if (this.debug)
          console.log(`la derniere date est ${lastItemTimestamp}`);
        const items = result.items
          .sort(
            (a, b) =>
              b?.photo?.high_resolution?.timestamp -
              a?.photo?.high_resolution?.timestamp
          )
          .filter(
            (item) =>
              !lastItemTimestamp ||
              item?.photo?.high_resolution?.timestamp > lastItemTimestamp
          );
        if (!items.length) return resolve();
        if (this.debug)
          console.log(`${items.length} d'articles trouvés sur ${url}!\n`);

        const newLastItemTimestamp =
          items[0]?.photo?.high_resolution?.timestamp;
        if (!lastItemTimestamp || newLastItemTimestamp > lastItemTimestamp)
          db.set(`last`, newLastItemTimestamp);
        if (this.debug)
          console.log(
            `lastItemTimestamp: ${lastItemTimestamp}\nnewLastItemTimestamp: ${newLastItemTimestamp}\n`
          );
        const itemsToNotify =
          lastItemTimestamp && !isFirstSync ? items.reverse() : [items[0]];
        if (itemsToNotify.length > 0) {
          db.set(`first`, true);
          if (this.debug)
            console.log(
              itemsToNotify.length > 1
                ? `nouveaux articles trouvés`
                : `nouvel article trouvé` + ` sur ${url}!\n`
            );
        }
        for (const item of itemsToNotify) {
          const obj = {
            id: item.id,
            url: {
              info: item.url,
              buy: `https://www.vinted.fr/transaction/buy/new?source_screen=item&transaction%5Bitem_id%5D=${item.id}`,
              sendmsg: `https://www.vinted.fr//items/${item.id}/want_it/new?button_name=receiver_id=${item.id}`,
            },
            title: item.title || "No title",
            pp: item.photo?.url,
            thumbnails: item.photo.thumbnails?.map((image) => image.url),
            prix: `${item.price || "No price"} ${item.currency || "EUR"}(${
              item.total_item_price || `vide`
            })`,
            taille: item.size_title || "vide",
            marque: item.brand_title || "vide",
            stats: {
              favori: item.favorite_count || 0,
              vue: item.view_count || 0,
            },
            timestamp: item?.photo?.high_resolution?.timestamp,
            vendeur: {
              name: item.user?.login || "vide",
              pp: item.user?.photo?.url,
              url: item.user?.profile_url,
            },
          };
          this.emit("item", obj);
        }
        resolve();
      } catch (error) {
        if (this.debug) console.error(error);
        return resolve();
      }
    });
  }
}

module.exports = VintedViewver;
