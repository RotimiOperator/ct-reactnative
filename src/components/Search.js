import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { JatodianSEs } from "../data/jatado-se-team";
import styles from "../Styles";

export default function Search() {
      const [searchKeyword, setSearchKeyword] = useState('');
      const [team, setTeam] = useState([]);

      const handleChange = (e) => {
        setSearchKeyword(e);
      };
      
      useEffect(() => {
        setTeam(JatodianSEs);
      }, []);

      let JSEteam = team;
      let search = searchKeyword.trim().toLowerCase();
      
      if (search.length > 0) {
        JSEteam = JSEteam.filter(function(team) {
          return team.name.toLowerCase().match(search);
        });
      }
 
      return (
        <View>
          <Text style={styles.heading}>Search For The Position of A Jatodian Software Engineer!</Text>
          <View>
            <TextInput
              style={styles.input}
              value={searchKeyword}
              onChangeText={handleChange}
              placeholder="Search for a Jatado Engineer"
            />
            {search.length && JSEteam.length ? 
            (<View>
              {JSEteam.map((engineer, index) => {
                return (
                <View key={index}>
                  <View style={styles.card}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex:1}}>
                        <Text style={styles.mood}>{engineer.mood}</Text>
                      </View>
                      <View style={{flex:8}}>
                        <Text style={styles.name}>{engineer.name}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.position}>{engineer.position}</Text>
                    </View>
                  </View>
                </View>
                );
              })}
            </View>)
            : search.length && !JSEteam.length ? (<View style={styles.card}><Text>No Match Found!</Text></View>)
            :(
              <View style={styles.card}><Text style={styles.subtext}>Are you a Jatado Engineer ? {'\n'} Yes! Search for your Position using your name.</Text></View>
            )}
          </View>
        </View>
      );
  };
  