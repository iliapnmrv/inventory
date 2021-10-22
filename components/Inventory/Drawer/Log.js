import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import * as SQLite from "expo-sqlite";
import BackHome from './BackHome'
import styles from './Styles/ListStyles'


export default function Log(props) {
    const [data, setData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true);   
      
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData()
    }, []);

    // Подключение к бд
    const db = SQLite.openDatabase('qr.db');

    // Получение данный из бд
    const getData = async () => {
        try {
            let result = new Promise(resolve => {
                db.transaction(
                    tx => {
                    tx.executeSql(
                        `
                        SELECT * FROM scanned ORDER BY id DESC
                        `, 
                        [], 
                        (_, result) => {
                            if (!result.rows.length) {
                                resolve(false)
                            }
                            let data = result.rows._array
                            setData(data)
                            resolve(true)
                        },
                        (_, error) => console.log(error)
                    );
                    }
                );
            })
            result.then(() => {
                setRefreshing(false)
                 i = 1
                return
            }).then(() => {
                setLoading(false);
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData();
    }, []);

    let i = 1

    return (
        <ScrollView 
            style={{flex: 1}}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View>
                <BackHome navigation={props.navigation} />
                <Text style={styles.sectionHeader}>Позиции в учете инвентаризационной описи</Text>
            </View>
            <ScrollView 
                style={{ flex: 1}}
                horizontal={true}
                persistentScrollbar={true}
                showsHorizontalScrollIndicator={true}
             >
                {isLoading ? <ActivityIndicator animating={true} size="large" style={{opacity:1}} color="#0000ff"/> : (
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.item} >
                                <Text style={styles.itemCell}>{i++}</Text>
                                <Text style={[styles.itemCell, styles.itemCenterCell]}>{item.name == "Не в учете" ? item.model : item.name}</Text>
                                <Text style={styles.itemCell}>{item.invNom.substr(-5)}</Text>
                            </View>
                        )}
                    />
                )}
            </ScrollView>
        </ScrollView>
    );
}
