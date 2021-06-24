import React, {useEffect, useState} from 'react'
import {SafeAreaView, SectionList, StyleSheet, Text, View} from 'react-native'

import SelectMultiple from 'react-native-select-multiple'
import axios from 'axios'
import {useIsFocused} from '@react-navigation/native'

export default ({props}) => {
  const [criterioPasse, setCriterioPasse] = useState([])
  const [criterioRemate, setCriterioRemate] = useState([])
  const [criterioBloco, setCriterioBloco] = useState([])
  const [criterioServico, setCriterioServico] = useState([])
  const [data, setData] = useState([])
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const isFocused = useIsFocused()

  useEffect(() => {
    const promises = []
    ;(async () => {
      promises.push(
        axios.get('http://volleyapi.sarapaiva.webtuga.net/Criterio/Passe'),
      )
      promises.push(
        axios.get('http://volleyapi.sarapaiva.webtuga.net/Criterio/Remate'),
      )
      promises.push(
        axios.get('http://volleyapi.sarapaiva.webtuga.net/Criterio/Bloco'),
      )
      promises.push(
        axios.get('http://volleyapi.sarapaiva.webtuga.net/Criterio/Serviço'),
      )

      try {
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

  return (
    <SafeAreaView>
      <Text>Lista de Critérios</Text>

      <Text>Passe</Text>
      {criterioPasse && (
        <SelectMultiple
          items={criterioPasse.map((item) => ({
            label: item.descricao,
            value: item.idCriterio,
          }))}
          selectedItems={[]}
          onSelectionsChange={() => {}}
        />
      )}
      <Text>Remate</Text>
      {criterioRemate && (
        <SelectMultiple
          items={criterioRemate.map((item) => ({
            label: item.descricao,
            value: item.idCriterio,
          }))}
          selectedItems={[]}
          onSelectionsChange={() => {}}
        />
      )}
      <Text>Bloco</Text>
      {criterioBloco && (
        <SelectMultiple
          items={criterioBloco.map((item) => ({
            label: item.descricao,
            value: item.idCriterio,
          }))}
          selectedItems={[]}
          onSelectionsChange={() => {}}
        />
      )}
      <Text>Serviço</Text>
      {criterioServico && (
        <SelectMultiple
          items={criterioServico.map((item) => ({
            label: item.descricao,
            value: item.idCriterio,
          }))}
          selectedItems={[]}
          onSelectionsChange={() => {}}
        />
      )}
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
  title: {
    fontSize: 24,
  },
})
