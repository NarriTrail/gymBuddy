import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar, Button } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

const TimerApp = () => {
  const [timers, setTimers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<any>({});

  useEffect(() => {
    loadTimers();
  }, []);

  // Load timers from AsyncStorage
  const loadTimers = async () => {
    const storedTimers = await AsyncStorage.getItem("timers");
    if (storedTimers) {
      setTimers(JSON.parse(storedTimers));
    }
  };

  // Save timers to AsyncStorage
  const saveTimers = async (newTimers:any) => {
    setTimers(newTimers);
    await AsyncStorage.setItem("timers", JSON.stringify(newTimers));
  };

  // Start countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers:any) =>
        prevTimers.map((category:{timers:[]}) => ({
          ...category,
          timers: category.timers.map((timer:{status:string,remaining:number}) => {
            if (timer.status === "Running" && timer.remaining > 0) {
              return { ...timer, remaining: timer.remaining - 1 };
            } else if (timer.remaining === 0 && timer.status === "Running") {
              return { ...timer, status: "Completed" };
            }
            return timer;
          }),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Add a new timer
  const addTimer = () => {
    if (!name || !duration || !category) return;

    const newTimer = {
      id: Date.now(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      status: "Paused",
      category,
    };

    const updatedTimers = timers.map((each:{category:string,timers:[]}) =>
      each.category === category
        ? { ...each, timers: [...(each.timers || []), newTimer] }
        : each
    );

    if (!timers.some((each:{category:string}) => each.category === category)) {
      updatedTimers.push({ category, timers: [newTimer] });
    }

    saveTimers(updatedTimers);
    setModalVisible(false);
    setName("");
    setDuration("");
    setCategory("");
  };

  // Toggle category collapse/expand
  const toggleCategory = (cat:any) => {
    setExpandedCategories((prev:any) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  // Update the timer status (start, pause, reset)
  const updateTimerStatus = (id:number, action:string) => {
    const updatedTimers = timers.map((eachCategory:{timers:[]}) => ({
      ...eachCategory,
      timers: eachCategory.timers.map((timer:{id:number,duration:number,remaining:number}) =>
        timer.id === id
          ? {
              ...timer,
              status:
                action === "start"
                  ? "Running"
                  : action === "pause"
                  ? "Paused"
                  : "Paused",
              remaining: action === "reset" ? timer.duration : timer.remaining,
            }
          : timer
      ),
    }));

    saveTimers(updatedTimers);
  };

  // Bulk start/pause/reset all timers in a category
  const bulkAction = (cat:string, action:string) => {
    const updatedTimers = timers.map((eachCategory:{category:string,timers:[]}) =>
      eachCategory.category === cat
        ? {
            ...eachCategory,
            timers: eachCategory?.timers.map((timer:{duration:number,remaining:number}) => ({
              ...timer,
              status: action === "reset" ? "Paused" : action,
              remaining: action === "reset" ? timer.duration : timer.remaining,
            })),
          }
        : eachCategory
    );
    saveTimers(updatedTimers);
  };

  // Render individual timer item
  const renderTimer = ({ item }:{item:{name:string,status:string,duration:number,remaining:number,id:number}}) => (
    <View style={styles.timerCard}>
      <Text style={styles.timerName}>{item.name}</Text>
      <Text style={styles.timeLeftText}>Status: {item.status}</Text>
      {item.status !== "Completed" && <Text style={styles.timeLeftText}>Time Left: {item.remaining}s</Text>}
      <ProgressBar
        progress={item.remaining / item.duration}
        color={item.remaining==0?'green':'skyblue'}
        style={styles.progressBar}
      />
      <View style={styles.timerButtons}>
        <Button onPress={() => updateTimerStatus(item.id, "start")}>Start</Button>
        <Button onPress={() => updateTimerStatus(item.id, "pause")}>Pause</Button>
        <Button onPress={() => updateTimerStatus(item.id, "reset")}>Reset</Button>
      </View>
    </View>
  );

  // Render each category with its timers
  const renderCategory = ({ item }:{item:{category:string,timers:[]}}) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.toggleContainer} onPress={() => toggleCategory(item.category)}>
        <Text style={styles.categoryHeader}>
           {item.category}
        </Text>
        <AntDesign name={expandedCategories[item.category]?"up":"down"} size={20} color={'#aaa'}/>
      </TouchableOpacity>
      {expandedCategories[item.category] && (
        <>
        <View style={styles.bulkButtons}>
            <TouchableOpacity style={[styles.categoryButtons,{backgroundColor:'#6AB46D'}]} onPress={() => bulkAction(item.category, "Running")}><Text style={styles.categotyBtnText}>Start All</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.categoryButtons,{backgroundColor:'rgba(123, 119, 119, 0.3)'}]} onPress={() => bulkAction(item.category, "Paused")}><Text style={styles.categotyBtnText}>Pause All</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.categoryButtons,{backgroundColor:'rgba(227, 15, 15, 0.4)'}]} onPress={() => bulkAction(item.category, "reset")}><Text style={styles.categotyBtnText}>Rest All</Text></TouchableOpacity>
          </View>
          <FlatList style={{}} data={item.timers} renderItem={renderTimer} />
          
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={{}}>
        <Text style={{textAlign:"center",marginVertical:20,fontWeight:'500',fontSize:20,color:'#fff'}}>Timer App</Text>
        </View>
      {timers.length === 0 ? (
        <Text style={styles.noTimersText}>No Timers Available</Text>
      ) : (
        <FlatList data={timers} renderItem={renderCategory}  showsVerticalScrollIndicator={false}/>
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <AntDesign name="plus" color={'#fff'} size={24}/>
      </TouchableOpacity>

      <Modal  visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput placeholder="Timer Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Duration (seconds)" value={duration} onChangeText={setDuration} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />
            <TouchableOpacity style={{alignSelf:"center",backgroundColor:'skyblue',padding:8,borderRadius:10,marginVertical:8}} onPress={addTimer}>
                <Text style={{color:'#fff',fontSize:14,fontWeight:'400',}}>Save Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{position:"absolute",backgroundColor:'#bbb',right:0,padding:5,borderRadius:20,aspectRatio:1}} onPress={()=>setModalVisible(false)}>
                <AntDesign name="close" size={12} color={'#fff'}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Add your styles here
const styles = StyleSheet.create({
  noTimersText: {textAlign: 'center', fontSize: 18, marginTop: 20},
  categoryContainer: {
    marginBottom: 15,
    marginHorizontal: 2,
    borderWidth: 0,
    justifyContent: 'center',
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'capitalize',
    color: '#aaa',
  },
  progressBar: {height: 10, marginVertical: 5, borderRadius: 10},
  bulkButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  container: {flex: 1, padding: 16, backgroundColor: 'skyblue'},
  timerCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
  },
  timerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize',
  },
  statusText: {fontSize: 14, color: 'gray'},
  timeLeft: {fontSize: 14, fontWeight: 'bold'},
  timerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {fontSize: 30, color: 'white'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  toggleContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  categoryButtons: {
    borderWidth: 0,
    padding: 5,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  categotyBtnText: {fontWeight: '800', color: '#fff'},
  timeLeftText: {fontWeight: 'bold', color: '#aaa'},
});

export default TimerApp;


