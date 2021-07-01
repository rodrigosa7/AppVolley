app.post('/addAvaliacao', (req, res) => {
  const idCriterio = req.body.idCriterio
  const idAthlete = req.body.idAtleta
  const Score = req.body.score

  db.query(
    'INSERT INTO `Criterio_Evaluation` (idCriterio, idAthlete, Score) VALUES (?, ?, ?)',
    [idCriterio, idAthlete, Score],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json({mensagemStatus: 'Avalialão Adicionada'})
      }
    },
  )
})
