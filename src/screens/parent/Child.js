import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import Avaliacao from '../../components/Avaliacao'
import Exercicio from '../../components/Exercice'
import axios from 'axios'
import {server} from '../../common'

export default ({route, navigation}) => {
  const [child, setChild] = useState(null)
  const [avaliacao, setAvaliacao] = useState([])
  const [exercicios, setExercicios] = useState([])

  const id = route.params.item.idAthlete
  useEffect(() => {
    ;(async () => {
      try {
        const [resAvaliacao, resExercicios] = await Promise.all([
          axios.get(`${server}/avaliacao/${id}`),
          axios.get(`${server}/exercicio/${id}`),
        ])
        setAvaliacao(resAvaliacao.data)
        setExercicios(resExercicios.data)
      } catch (e) {
        console.warn(e)
      }
    })()
  }, [])

  return (
    <SafeAreaView>
      <Text>AVALIACAO</Text>
      {avaliacao.length == 0 ? (
        <Text>Não existem avaliações registadas</Text>
      ) : (
        <FlatList
          data={avaliacao}
          keyExtractor={(item) => `${item.idAthlete_Evaluation}`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('InfoExercicio', {item})}>
              <Avaliacao {...item} />
            </TouchableOpacity>
          )}
        />
      )}
      <Text>EXERCICIOS</Text>
      {exercicios.length == 0 ? (
        <Text>Não existem exercicios registadas</Text>
      ) : (
        <FlatList
          data={exercicios}
          keyExtractor={(item) => `${item.idAthlete_Evaluation}`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Exercice', {url: item.urlEx_Athlete})
              }>
              <Exercicio {...item} />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  )
}
