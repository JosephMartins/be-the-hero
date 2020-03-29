import React, { useState, useEffect } from 'react';
//icone
import { Feather } from '@expo/vector-icons';
//mudulo de redirecionamento
import { useNavigation } from '@react-navigation/native';
//elementos do react native
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const navigation = useNavigation();

  
  function navigateToDetail(incident) {
    //envia todos os dados do incident para a rota detail
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents() {

    if(loading){
      return;
    }

    if(total > 0 && incidents.length == total){
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: { page }
    });
    setIncidents([... incidents, ... response.data]);
    //pega o total de incidents que fica armazenado no navegador x total count
    setTotal(response.headers['x-total-count']);
    setPage(page + 1 );
    setLoading(false);
  }



  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>



      <FlatList
        //quantidade de incidents
        data={incidents}
        //o estilo de cada lista
        style={styles.incidentList}
        //isso tira o scrolling
        showsVerticalScrollIndicator={false}
        //dispara função quando o usuario chegar ao fim da lista
        onEndReached={loadIncidents}
        //quando chegar em 20% carregara mais casos
        onEndReachedThreshold={0.2}
        //identificar cada lista
        //value do valor está formatado com um modulo de instalação intl "npm instal  intl"
        keyExtractor={incident => String(incident.id)}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>

            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText} >Verr mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />

    </View >


  );
}