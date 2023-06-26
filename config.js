module.exports = {
  token: process.env.TOKEN,
  moniteur: {
    interval: 15000,
    debug: true,
    urls: [
      // { url: "url vinted", salon: "salon logs" }
      {
        url: "https://www.vinted.fr/catalog?search_text=Ralph%20Lauren&catalog[]=536&search_id=10029689837&material_ids[]=146&order=newest_first",
        salon: "1122379994249822258",
      },
      {
        url: "https://www.vinted.fr/catalog?search_text=Ralph%20Lauren&catalog[]=536&search_id=10029689837&order=newest_first",
        salon: "1122390696675004558",
      },
      {
        url: "https://www.vinted.fr/catalog?catalog[]=260&search_id=10029689837&order=newest_first&brand_id[]=362",
        salon: "1122390972786028605",
      },
      {
        url: "https://www.vinted.fr/catalog?search_id=10031774553&order=newest_first&brand_id[]=362&brand_id[]=65&search_text=short&catalog[]=80",
        salon: "1122391387539783780",
      },
      {
        url: "https://www.vinted.fr/catalog?search_id=10031774553&order=newest_first&catalog[]=1821&brand_id[]=304&brand_id[]=88",
        salon: "1122391494721011762",
      },
      {
        url: "https://www.vinted.fr/catalog?search_id=10031774553&order=newest_first&brand_id[]=6&catalog[]=1812",
        salon: "1122391744319852624",
      },
      {
        url: "https://www.vinted.fr/catalog?brand_id[]=362&brand_id[]=65&brand_id[]=10&brand_id[]=53&brand_id[]=14&brand_id[]=88&brand_id[]=94&brand_id[]=255&brand_id[]=304&order=newest_first&catalog[]=80",
        salon: "1122521391271530546",
      },
      {
        url: "https://www.vinted.fr/catalog?brand_id[]=362&brand_id[]=65&brand_id[]=10&brand_id[]=53&brand_id[]=14&brand_id[]=88&brand_id[]=94&brand_id[]=304&price_from=0&currency=EUR&price_to=5&catalog[]=2050&status_ids[]=2&status_ids[]=3&order=newest_first",
        salon: "1122521067395747942",
      },
      {
        url: "https://www.vinted.fr/catalog?brand_id[]=362&brand_id[]=65&brand_id[]=10&brand_id[]=53&brand_id[]=14&brand_id[]=88&brand_id[]=94&brand_id[]=304&price_from=0&currency=EUR&price_to=12&catalog[]=2050&status_ids[]=2&status_ids[]=3&order=newest_first",
        salon: "1122521274913144852",
      },
      {
        url: "https://www.vinted.fr/catalog?order=newest_first&catalog[]=1231&brand_id[]=2703",
        salon: "1122606227826950265",
      },
    ],
  },
};
