#!/usr/bin/env node
// Migration script pour mettre à jour le document accueil avec la nouvelle structure (messages, events, etc.)

const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
    console.error('❌ Variables NEXT_PUBLIC_SANITY_PROJECT_ID et NEXT_PUBLIC_SANITY_DATASET requises');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token: token || undefined,
    useCdn: false,
    apiVersion: '2024-01-01',
});

const applyChanges = process.argv.includes('--apply');
if (!applyChanges) {
    console.log('🔍 Mode dry-run (aucune modification). Ajoutez --apply pour appliquer.');
} else if (!token) {
    console.error('❌ Mode --apply nécessite SANITY_API_TOKEN (token avec droits write)');
    process.exit(1);
}

async function main() {
    console.log(`📡 Connexion à ${projectId}/${dataset}`);

    // Récupérer le document accueil existant
    const doc = await client.fetch('*[_type == "accueil"][0]');
    if (!doc) {
        console.log('❌ Aucun document accueil trouvé. Créez-en un d\'abord.');
        return;
    }

    console.log(`📄 Document trouvé : ${doc._id} - ${doc.heroTitle || 'sans titre'}`);

    // Vérifier les champs manquants
    const updates = {};
    let hasChanges = false;

    // Ajouter les champs s'ils n'existent pas
    if (!doc.directorMessage) {
        updates.directorMessage = {
            title: 'Mot du Directeur',
            content: [{ _type: 'block', _key: 'd1', children: [{ _type: 'span', text: 'Message du directeur à personnaliser.' }] }],
            signature: ''
        };
        hasChanges = true;
        console.log('➕ Ajout du champ directorMessage');
    }
    if (!doc.caiMessage) {
        updates.caiMessage = {
            title: 'Mot du responsable CAI',
            content: [{ _type: 'block', _key: 'c1', children: [{ _type: 'span', text: 'Message à personnaliser.' }] }],
            signature: ''
        };
        hasChanges = true;
        console.log('➕ Ajout du champ caiMessage');
    }
    if (!doc.featuredEvents) {
        updates.featuredEvents = [];
        hasChanges = true;
        console.log('➕ Ajout du champ featuredEvents (tableau vide)');
    }
    if (!doc.featuredFormations) {
        updates.featuredFormations = [];
        hasChanges = true;
        console.log('➕ Ajout du champ featuredFormations (tableau vide)');
    }
    if (!doc.bottomCta) {
        updates.bottomCta = { text: 'Rejoignez-nous', link: '/inscription' };
        hasChanges = true;
        console.log('➕ Ajout du champ bottomCta');
    }

    if (!hasChanges) {
        console.log('✅ Le document est déjà à jour.');
        return;
    }

    if (applyChanges) {
        // Appliquer les mises à jour
        const result = await client.patch(doc._id).set(updates).commit();
        console.log(`✅ Document ${result._id} mis à jour avec succès.`);
    } else {
        console.log('⚠️ Changements détectés mais non appliqués (dry-run). Utilisez --apply pour appliquer.');
        console.log('Modifications proposées :', JSON.stringify(updates, null, 2));
    }
}

main().catch(err => {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
});