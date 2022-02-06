import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { filenames } from "../data/filenames";
import styles from "../Styles";

export default function Search() {
      const [searchKeyword, setSearchKeyword] = useState('');
      const [filename, setFileName] = useState([]);

      const handleChange = (e) => {
        setSearchKeyword(e);
      };
      
      useEffect(() => {
        setFileName(filenames);
      }, []);

      let files = filename;
      let search = searchKeyword.trim().toLowerCase();
  
      if (search.length > 0) {
        var searchWord = files.filter(function(files) {
          return files.filename.toLowerCase().match(search);
        });

        var searchchars = search.split("");
        const searchCharFile = [];
        
        searchchars.forEach(element => {
          const searchCharFiles = files.filter(function(files) {
            return files.filename.toLowerCase().match(element)
          });
          searchCharFile.push(searchCharFiles);
        });

        var searchChar = Object.entries(
          Object.fromEntries(
            searchCharFile.flat(1)
            .map(v => [v.filename, v.description])))
            .map(([filename, description]) => ({filename, description}));

        var searchOther = searchChar.filter(a => !searchWord.map(b=>b.filename).includes(a.filename));
      }
  
      return (
        <View>
          <Text style={styles.heading}>Search Box!</Text>
          <View>
            <TextInput
              style={styles.input}
              maxLength={10}
              value={searchKeyword}
              onChangeText={handleChange}
              placeholder="Search for a File"
            />
            {search.length && files.length ? 
            (<View>
              {searchWord.length ? (<View style={styles.purple_card}>
                <Text>{searchWord.length} Perfect Match Found!</Text>
                </View>) : (<></>)}
              {searchWord.map((file, index) => {
                return (
                <View key={index}>
                  <View style={styles.card}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex:1}}>
                        <Text style={styles.icon}>📂</Text>
                      </View>
                      <View style={{flex:8}}>
                        <Text style={styles.name}>{file.filename}</Text>
                        <Text style={styles.name_info}>Perfect Match</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.desc}>{file.description}</Text>
                    </View>
                  </View>
                </View>
                );
              })}

              {searchOther.length ? (<View style={styles.purple_card}>
                <Text>{searchOther.length} Occurrences Found!</Text>
                </View>) : (<></>)}
              {searchOther.map((file, index) => {
                return (
                <View key={index}>
                  <View style={styles.card}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex:1}}>
                        <Text style={styles.icon}>📂</Text>
                      </View>
                      <View style={{flex:8}}>
                        <Text style={styles.name}>{file.filename}</Text>
                        <Text style={styles.name_info}>Possible Match</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.desc}>{file.description}</Text>
                    </View>
                  </View>
                </View>
                );
              })}
            </View>)
            : search.length && !files.length ? (<View style={styles.card}><Text>No Match Found!</Text></View>)
            :(
              <View style={styles.card}>
                <Text style={styles.subtext}>
                  Assuming you stored your files using each day of the week as the file name i.e Monday, Tuesday, and so on.
                  Search for a file using a certain day of the week.
                </Text>
              </View>
            )}
          </View>
        </View>
      );
  };
  