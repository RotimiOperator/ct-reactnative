import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import styles from "../Styles";

export default function Form() {
    const [anumber, setAnumber] = useState('');
    const [singleFile, setSingleFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [anumberMsg, setAnumberMsg] = useState('');
    const [fileMsg, setFileMsg] = useState('');

    const handleNumberInput = (e) => {
        setAnumber(e);
        if (e.length < 1) {
            setAnumberMsg('');
        } else if (!isNaN(e) && !isNaN(parseInt(e, 10))) {
            setAnumberMsg("Good: Correct! Your input is a number!");
        } else {
            setAnumberMsg("Bad: Your input is not a number. \n Your input must be a number!");
        };
    };

    const handleFileInput = async () => {
        let file = await DocumentPicker.getDocumentAsync({});
        
        const maxsize = 1024 * 1024 * 2;
        const filetype = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        
        setSelectedFile(file.name);

        if (file.size > maxsize) {
            setFileMsg("Bad: File size cannot exceed more than 2MB!");
        } else if (filetype.indexOf(file.mimeType) < 0) {
            setFileMsg("Bad: File type is not an image or PDF! \n Supported file type: JPG, PNG, GIF or PDF!");
        } else {
            setFileMsg("Good: File size is 2MB or less and File type is supported!");
        };
      };
    
    return (
        <View>
            <Text style={styles.heading}>This input accepts only numbers</Text>
            <TextInput
                style={styles.input}
                value={anumber} 
                onChangeText={handleNumberInput}
            />
            {anumberMsg ? (<View style={styles.card}><Text style={anumberMsg[0] === 'G' ? styles.good : styles.bad}>{anumberMsg}</Text></View>) : (<></>)}

            <Text style={styles.heading}>This input accepts not more than 2MB</Text>
            {/* <input type="file" value={selectedFile} onChange={handleFileInput} /> */}
            <TouchableOpacity
                style={styles.file}
                activeOpacity={0.5}
                onPress={handleFileInput}>
                <Text style={styles.button}>Select File</Text>
            </TouchableOpacity>
            {selectedFile ? (<Text style={fileMsg[0] === 'G' ? styles.good : styles.bad}>Selected File: {selectedFile}</Text>) : (<></>)}
            {fileMsg ? (<View style={styles.card}><Text style={fileMsg[0] === 'G' ? styles.good : styles.bad}>{fileMsg}</Text></View>) : (<></>)}
            <View style={styles.empty}></View>
        </View>
    );
};