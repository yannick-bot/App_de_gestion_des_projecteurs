const express = require('express');

const router = express.Router();

// Exemple de données de réservation
let reservations = [
    { id: 1, user_id: 1, projecteur_id: 101, hDebut: '2023-10-01T10:00:00', hFin: '2023-10-01T12:00:00' },
    { id: 2, user_id: 2, projecteur_id: 102, hDebut: '2023-10-02T14:00:00', hFin: '2023-10-02T16:00:00' }
];

// Route pour obtenir toutes les réservations
router.get('/', (req, res) => {
    res.json(reservations);
});

// Route pour obtenir une réservation par ID
router.get('/:id', (req, res) => {
    const reservation = reservations.find(r => r.id === parseInt(req.params.id));
    if (!reservation) return res.status(404).send('Réservation non trouvée');
    res.json(reservation);
});

// Route pour créer une nouvelle réservation
router.post('/', (req, res) => {
    const newReservation = {
        id: reservations.length + 1,
        user_id: req.body.user_id,
        projecteur_id: req.body.projecteur_id,
        hDebut: req.body.hDebut,
        hFin: req.body.hFin,
    };
    reservations.push(newReservation);
    res.status(201).json(newReservation);
});

// Route pour mettre à jour une réservation existante
router.put('/:id', (req, res) => {
    const reservation = reservations.find(r => r.id === parseInt(req.params.id));
    if (!reservation) return res.status(404).send('Réservation non trouvée');

    reservation.user_id = req.body.user_id;
    reservation.projecteur_id = req.body.projecteur_id;
    reservation.hDebut = req.body.hDebut;
    reservation.hFin = req.body.hFin;
    res.json(reservation);
});

// Route pour supprimer une réservation
router.delete('/:id', (req, res) => {
    const reservationIndex = reservations.findIndex(r => r.id === parseInt(req.params.id));
    if (reservationIndex === -1) return res.status(404).send('Réservation non trouvée');

    const deletedReservation = reservations.splice(reservationIndex, 1);
    res.json(deletedReservation);
});

module.exports = router;