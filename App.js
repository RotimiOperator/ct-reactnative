import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import styles from './src/Styles';
import Search from './src/components/Search';
import Form from './src/components/Form';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.main}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <StatusBar style="auto" />
          <Search />
          <Form />
      </ScrollView>
    </View>
  );
}