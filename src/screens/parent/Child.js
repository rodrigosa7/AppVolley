import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import Avaliacao from '../../components/Avaliacao'
import Exercicio from '../../components/Exercice'
import axios from 'axios'
import globalStyles from '../../styles'
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
    <SafeAreaView style={{height: '100%', flexDirection: 'column'}}>
      <View style={{height: '50%'}}>
        <Text style={globalStyles.title}>Avaliações</Text>

        {avaliacao.length == 0 ? (
          <Text>Não existem avaliações registadas</Text>
        ) : (
          <FlatList
            style={{width: '90%', alignSelf: 'center'}}
            data={avaliacao}
            keyExtractor={(item) => `${item.idAthlete_Evaluation}`}
            renderItem={({item}) => <Avaliacao {...item} />}
          />
        )}
      </View>
      <View style={{height: '50%'}}>
        <Text style={globalStyles.title}>Exercícios</Text>

        {exercicios.length == 0 ? (
          <Text>Não existem exercicios registadas</Text>
        ) : (
          <FlatList
            style={{width: '90%', alignSelf: 'center'}}
            data={exercicios}
            keyExtractor={(item) => `${item.idEx_Athlete}`}
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
      </View>
    </SafeAreaView>
  )
}
