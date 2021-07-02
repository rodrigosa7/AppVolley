import {
  Button,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useEffect, useState} from 'react'

import Icon from 'react-native-vector-icons/FontAwesome5'
import SelectMultiple from 'react-native-select-multiple'
import axios from 'axios'
import globalStyles from '../../styles'
import moment from 'moment'
import {server} from '../../common'
import {useIsFocused} from '@react-navigation/native'

export default ({props, route}) => {
  const [criterioPasse, setCriterioPasse] = useState([])
  const [criterioRemate, setCriterioRemate] = useState([])
  const [criterioBloco, setCriterioBloco] = useState([])
  const [criterioServico, setCriterioServico] = useState([])
  const [criterioPasseSelecionado, setCriterioPasseSelecionado] = useState([])
  const [criterioRemateSelecionado, setCriterioRemateSelecionado] = useState([])
  const [criterioBlocoSelecionado, setCriterioBlocoSelecionado] = useState([])
  const [criterioServicoSelecionado, setCriterioServicoSelecionado] = useState(
    [],
  )

  const [data, setData] = useState([])
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const isFocused = useIsFocused()

  useEffect(() => {
    ;(async () => {
      try {
        const promises = [
          axios.get(`${server}/Criterio/Passe`),
          axios.get(`${server}/Criterio/Remate`),
          axios.get(`${server}/Criterio/Bloco`),
          axios.get(`${server}/Criterio/Serviço`),
        ]

        const [reqPasse, reqRemate, reqBloco, reqServico] = await Promise.all(
          promises,
        )

        setCriterioPasse(reqPasse.data)
        setCriterioRemate(reqRemate.data)
        setCriterioBloco(reqBloco.data)
        setCriterioServico(reqServico.data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  const onAdd = async () => {
    try {
      const passeScore = criterioPasseSelecionado.length / criterioPasse.length
      await axios.post(`${server}/addGestoEvaluation`, {
        idGesto: 9,
        idAtleta: route.params.id,
        score: passeScore,
      })

      const servicoScore =
        criterioServicoSelecionado.length / criterioServico.length
      await axios.post(`${server}/addGestoEvaluation`, {
        idGesto: 10,
        idAtleta: route.params.id,
        score: servicoScore,
      })

      const remateScore =
        criterioRemateSelecionado.length / criterioRemate.length
      await axios.post(`${server}/addGestoEvaluation`, {
        idGesto: 13,
        idAtleta: route.params.id,
        score: remateScore,
      })

      const scoreBloco = criterioBlocoSelecionado.length / criterioBloco.length
      await axios.post(`${server}/addGestoEvaluation`, {
        idGesto: 15,
        idAtleta: route.params.id,
        score: scoreBloco,
      })

      await axios.post(`${server}/addEvaluation`, {
        idAtleta: route.params.id,
        score:
          ((passeScore + servicoScore + remateScore + scoreBloco) / 4) * 20,
        data: moment().unix(),
      })
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={globalStyles.title}>Lista de Critérios</Text>
        <View style={globalStyles.content}>
          <View style={globalStyles.form.group}>
            <Text style={[globalStyles.form.label, {marginBottom: 10}]}>
              Passe
            </Text>
            {criterioPasse && (
              <SelectMultiple
                items={criterioPasse.map((item) => ({
                  label: item.descricao,
                  value: item.idCriterio,
                }))}
                selectedItems={criterioPasseSelecionado}
                onSelectionsChange={(selectedItems) =>
                  setCriterioPasseSelecionado(selectedItems)
                }
              />
            )}
          </View>
          <View style={globalStyles.form.group}>
            <Text style={[globalStyles.form.label, {marginBottom: 10}]}>
              Remate
            </Text>
            {criterioRemate && (
              <SelectMultiple
                items={criterioRemate.map((item) => ({
                  label: item.descricao,
                  value: item.idCriterio,
                }))}
                selectedItems={criterioRemateSelecionado}
                onSelectionsChange={(selectedItems) =>
                  setCriterioRemateSelecionado(selectedItems)
                }
              />
            )}
          </View>
          <View style={globalStyles.form.group}>
            <Text style={[globalStyles.form.label, {marginBottom: 10}]}>
              Bloco
            </Text>
            {criterioBloco && (
              <SelectMultiple
                items={criterioBloco.map((item) => ({
                  label: item.descricao,
                  value: item.idCriterio,
                }))}
                selectedItems={criterioBlocoSelecionado}
                onSelectionsChange={(selectedItems) =>
                  setCriterioBlocoSelecionado(selectedItems)
                }
              />
            )}
          </View>
          <View style={globalStyles.form.group}>
            <Text style={[globalStyles.form.label, {marginBottom: 10}]}>
              Serviço
            </Text>
            {criterioServico && (
              <SelectMultiple
                items={criterioServico.map((item) => ({
                  label: item.descricao,
                  value: item.idCriterio,
                }))}
                selectedItems={criterioServicoSelecionado}
                onSelectionsChange={(selectedItems) =>
                  setCriterioServicoSelecionado(selectedItems)
                }
              />
            )}
          </View>

          <TouchableOpacity style={globalStyles.form.button} onPress={onAdd}>
            <Text style={globalStyles.form.buttonText}>Adicionar</Text>
            <Icon style={globalStyles.form.formIcon} name="check"></Icon>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },

  text: {
    color: '#333',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    color: '#da581e',
    margin: 10,
    fontWeight: 'bold',
  },

  icone: {
    marginLeft: 10,
  },
  buttonImage: {
    backgroundColor: '#da581e',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 7,
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    width: '40%',
    borderRadius: 7,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
})
