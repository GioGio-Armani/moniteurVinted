const vinted = require('vinted-api');
// test('search url', () => {
//     return vinted.search('https://www.vinted.fr/vetements?search_text=pantalon')
//         .then(result => {
//             console.log('Résultat de la fonction search :', result); // Affiche uniquement le premier élément du résultat
//             expect(result).not.toBeNull();
//         })
//         .catch(error => {
//             console.error('Erreur lors de l\'exécution de la fonction search :', error);
//             throw error;
//         });
// });

test('fetch cookie', () => {
    return vinted.fetchCookie()
        .then(token => {
            console.log('Résultat de la fonction fetchCookie :', token);
            expect(token).not.toBeNull();
        })
        .catch(error => {
            console.error('Erreur lors de l\'exécution de la fonction fetchCookie :', error);
            throw error;
        });
});

test('search url', () => {
    return vinted.search('https://www.vinted.fr/vetements?search_text=pantalon')
        .then(result => {
            console.log('Résultat de la fonction search :', result.items[0]);
            expect(result).not.toBeNull();
        })
        .catch(error => {
            console.error('Erreur lors de l\'exécution de la fonction search :', error);
            throw error;
        });
});

