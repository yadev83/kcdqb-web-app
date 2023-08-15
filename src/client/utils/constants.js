export const API_URL = process.env.NODE_ENV === 'production' ? 'http://kcdqb.fr:3001' : 'http://localhost:3001'

export const KEY_TO_STRING = {
    'id': 'Identifiant',
    'name': 'Nom',
    'category': 'Catégorie',
    'description': 'Description',
    'link': 'Lien',
    'system': 'Système',
    'qol': 'Utils & Quality of life',
    'equipment': 'Outils, armes & armures',
    'magic': 'Magie et artéfacts',
    'progress': 'Progression',
    'tech': 'Crafting & Tech',
    'flora': 'Agriculture, plantes & nourriture',
    'mobs': 'Mobs & Animaux',
    'worldgen': 'Biomes, structures, dimensions',
    'misc': 'Miscellaneous',
    'empty_results': "Aucun résultat à afficher..."
}