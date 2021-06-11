import React, {useEffect, useState} from 'react';
import {SafeAreaView, SectionList, StyleSheet, Text, View} from 'react-native';

import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

export default ({props}) => {
  const [criterioPasse, setCriterioPasse] = useState([]);
  const [criterioRemate, setCriterioRemate] = useState([]);
  const [criterioBloco, setCriterioBloco] = useState([]);
  const [criterioServico, setCriterioServico] = useState([]);
  const [promessas, setPromessas] = useState([]);
  const [data, setData] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    promessas.push(
      getInfo(
        insereDados,
        'http://volleyapi.sarapaiva.webtuga.net/Criterio/Passe',
        criterioPasse,
      ),
    );
    promessas.push(
      getInfo(
        insereDados,
        'http://volleyapi.sarapaiva.webtuga.net/Criterio/Remate',
        criterioRemate,
      ),
    );
    promessas.push(
      getInfo(
        insereDados,
        'http://volleyapi.sarapaiva.webtuga.net/Criterio/Bloco',
        criterioBloco,
      ),
    );
    promessas.push(
      getInfo(
        insereDados,
        'http://volleyapi.sarapaiva.webtuga.net/Criterio/Serviço',
        criterioServico,
      ),
    );

    Promise.all(promessas).then((values) => {
      createList();
    });
  }, []);

  const insereDados = ([dados], array) => {
    array.push(dados);
  };
  const getInfo = async (fun, url, array) => {
    return await new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((result) => {
          fun(result.data, array);

          resolve();
        })
        .catch((error) => {
          reject();
        });
    });
  };

  const createList = () => {
    setData([
      {
        title: 'Passe',
        data: criterioPasse,
      },
      {
        title: 'Remate',
        data: criterioRemate,
      },
      {title: 'Bloco', data: criterioBloco},
      {title: 'Serviço', data: criterioServico},
    ]);
  };
  const Criterio = (props) => (
    <View style={styles.item}>
      <Text style={styles.title}>{props.descricao}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <Text>Lista de Critérios</Text>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Criterio {...item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}></SectionList>
    </SafeAreaView>
  );
};

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
});
