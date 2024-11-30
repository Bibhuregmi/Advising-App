import { StyleSheet, 
        Text, 
        View, 
        TextInput, 
        Button, 
        FlatList, 
        KeyboardAvoidingView,
        TouchableWithoutFeedback,
        Keyboard,
        Platform } from 'react-native'
import React, { useState } from 'react'
import { AirbnbRating } from '@rneui/themed'
import Dropdown from '../components/dropdown'

const Survey = () => {
    const [professor, setProfessor] = useState(null);
    const [professors] = useState([
        {label: 'Mr.Bibhushit Regmi', value: 'Intro to SDE'},
        {label: 'Mr.Shishir Regmi', value: 'Mastering Algorithms'},
        {label: 'Mr.Raj Ghimire', value: 'Project Management'},
    ])

    const [professorRating, setProfessorRating] = useState({
        knowledge: 0, 
        calrity: 0,
        engagement: 0,  
    });

    const [courseRating, setCourseRating] = useState({
        relevance: 0, 
        materials: 0, 
        application: 0,
    });

    const [feedback, setFeedback] = useState(''); 

    const handleRatingChange = (type, key, rating) => {
        if (type === 'professor'){
            setProfessorRating({...professorRating, [key]:rating});
        }else if (type === 'course'){
            setCourseRating({...courseRating, [key]:rating}); 
        }
    };

    const handleSubmit = () => {
        if (!professor){
            alert('Please select a professor before submitting');
            return; 
        }
        console.log('Submitted Data:', surveyData);
        alert('Survey Submitted!'); 
    }

    const surveyData = {
        professor, 
        professorRating, 
        courseRating, 
        feedback,
    };
    
  return (
    <View style = {styles.container}>
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
                data={[
                    {key : 'header', type: 'header'}, 
                    {key : 'professor', type: 'professor'}, 
                    {key : 'professorRating', type: 'professorRating'}, 
                    {key : 'courseRating', type: 'courseRating'}, 
                    {key : 'feedback', type: 'feedback'}, 
                    {key : 'submit', type: 'submit'}, 
                ]}
                renderItem={({item}) => {
                    switch (item.type) {
                        case 'header' :
                            return(
                                <>
                                    <Text style = {styles.title}> Course Feedback Survey</Text>
                                    <Text style = {styles.subtitle}>
                                        Please rate the following aspects of you professor and the course content.
                                    </Text>
                                </>
                            );
                        case 'professor' :
                            return(
                                <>
                                    <Text style = {styles.sectionTitle}> Select Professor </Text>
                                    <Dropdown
                                        items={professors}
                                        selectedValues={professor}
                                        onSelect={setProfessor}
                                        placeholder="Select a professor"
                                        containerStyle={{ marginBottom: 20 }}
                                        dropdownStyle={{
                                            borderColor: "#38b6ff",
                                            backgroundColor: '#e0e0e0',
                                        }}
                                        itemStyle={{
                                            backgroundColor: '#e0e0e0',
                                        }}
                                        textStyle={{
                                            color: '#1e1e1e'
                                        }}
                                    />
                                </>
                            );
                        case 'professorRating' :
                            if (!professor) return null; 
                            return(
                                <>
                                    <Text style = {styles.sectionTitle}>Professor Rating</Text>
                                    <View style = {styles.ratingGroup}>
                                        <Text style = {styles.label}>Knowledge</Text>
                                            <AirbnbRating
                                                size = {25}
                                                count={5}
                                                rating={professorRating.knowledge}
                                                defaultRating={0}
                                                selectedColor='#f4d03f'
                                                showRating={false}
                                                starContainerStyle={styles.starContainer}
                                                onFinishRating={(rating) => 
                                                    handleRatingChange('professor', 'knowledge', rating)
                                                }
                                            />
                                    </View>
                                    <View style = {styles.ratingGroup}>
                                        <Text style = {styles.label}>Clarity</Text>
                                            <AirbnbRating
                                                size = {25}
                                                count={5}
                                                rating={professorRating.calrity}
                                                defaultRating={0}
                                                selectedColor='#f4d03f'
                                                showRating={false}
                                                starContainerStyle={styles.starContainer}
                                                onFinishRating={(rating) => 
                                                    handleRatingChange('professor', 'clarity', rating)
                                                }
                                            />
                                    </View>
                                    <View style = {styles.ratingGroup}>
                                        <Text style = {styles.label}>Engagement</Text>
                                            <AirbnbRating
                                                size = {25}
                                                count={5}
                                                rating={professorRating.engagement}
                                                defaultRating={0}
                                                selectedColor='#f4d03f'
                                                showRating={false}
                                                starContainerStyle={styles.starContainer}
                                                onFinishRating={(rating) => 
                                                    handleRatingChange('professor', 'engagement', rating)
                                                }
                                            />
                                    </View>
                                </>
                            );
                        case 'courseRating' :
                            if (!professor) return null; 
                            return(
                                <>
                                    <Text style = {styles.sectionTitle}> Course Content Rating</Text>
                                    <View style = {styles.ratingGroup}>
                                        <Text style = {styles.label}>Relevance</Text>
                                            <AirbnbRating
                                                size = {25}
                                                count={5}
                                                rating={professorRating.relevance}
                                                defaultRating={0}
                                                selectedColor='#f4d03f'
                                                showRating={false}
                                                starContainerStyle={styles.starContainer}
                                                onFinishRating={(rating) => 
                                                    handleRatingChange('professor', 'relevance', rating)
                                                }
                                            />
                                    </View>
                                    <View style = {styles.ratingGroup}>
                                        <Text style = {styles.label}>Materials</Text>
                                            <AirbnbRating
                                                size = {25}
                                                count={5}
                                                rating={professorRating.materials}
                                                defaultRating={0}
                                                selectedColor='#f4d03f'
                                                showRating={false}
                                                starContainerStyle={styles.starContainer}
                                                onFinishRating={(rating) => 
                                                    handleRatingChange('professor', 'materials', rating)
                                                }
                                            />
                                    </View>
                                    <View style = {styles.ratingGroup}>
                                        <Text style = {styles.label}>Application</Text>
                                            <AirbnbRating
                                                size = {25}
                                                count={5}
                                                rating={professorRating.application}
                                                defaultRating={0}
                                                selectedColor='#f4d03f'
                                                showRating={false}
                                                starContainerStyle={styles.starContainer}
                                                onFinishRating={(rating) => 
                                                    handleRatingChange('professor', 'application', rating)
                                                }
                                            />
                                    </View>
                                </>
                            );
                        case 'feedback' :
                            if (!professor) return null; 
                            return(
                                <>
                                    <Text style = {styles.sectionTitle}>Addition Feedback</Text>
                                    <TextInput
                                        style = {styles.textInput}
                                        placeholder="Write your feedback here....."
                                        placeholderTextColor='#eee'
                                        multiline
                                        value={feedback}
                                        onChangeText={setFeedback}
                                        color = '#eee'
                                    />
                                </>
                            ); 
                        case 'submit':
                            if (!professor) return null; 
                            return(
                                <Button title = "Submit Survey" onPress={handleSubmit} color="#38b6ff"/>
                            );
                        default:
                            return null;   
                    }
                }}
                keyExtractor={(item) => item.key}
            />
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </View>
  )
}

export default Survey;

const styles = StyleSheet.create({
    scrollContainer:{
        flex: 1, 
        backgroundColor: '#121212',
    },
    container: {
        flex: 1, 
        padding: 60,  
        backgroundColor: '#121212',
    },
    title:{
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 12, 
        color: '#38b6ff', 
    },
    subtitle:{
        fontSize: 14, 
        textAlign: 'center', 
        color: '#e0e0e0',
        marginBottom: 20, 
    },
    sectionTitle: {
        fontSize: 18, 
        fontWeight: 'bold', 
        marginTop: 20, 
        marginBottom: 10, 
        color: '#e0e0e0',
        textAlign: 'center',
    },
    ratingGroup:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 12,
        paddingHorizontal: 10,  
    },
    label:{
        fontSize: 16, 
        color: '#e0e0e0',
        marginTop: 20,  
    },
    textInput:{
        borderColor: '#38b6ff',
        borderWidth: 1, 
        borderRadius: 8, 
        padding: 10, 
        marginBottom: 20, 
        backgroundColor: '#121212'
    },
    starContainer:{
        marginTop: 10, 
        marginBottom: 10, 
    }
})