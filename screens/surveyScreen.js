import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AirbnbRating } from '@rneui/themed'
import Dropdown from '../components/dropdown'

const Survey = () => {
    const [professor, setProfessor] = useState(null);
    const [professors] = useState([
        {label: 'Mr.Bibhushit Regmi', value: 'bibhu'},
        {label: 'Mr.Shishir Regmi', value: 'shree'},
        {label: 'Mr.Raj Ghimire', value: 'raj'},
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
    <ScrollView>
    <View style = {styles.container}>
      <Text style = {styles.title}>Course Feedback Survey</Text>
      <Text style = {styles.subtitle}>
        Please Rate the following aspects of your professor and the course content. 
      </Text>

      <Text stlye = {styles.sectionTitle}> Select Professor </Text>
      <Dropdown
        items={professors}
        selectedValues={professor}
        onSelect={setProfessor}
        placeholder="Select a professor"
      />
        {professor && (
            <>
                <Text styles = {styles.sectionTitle}>Professor Rating</Text>
                <View style = {styles.ratingGroup}>
                    <Text>Knowledge</Text>
                        <AirbnbRating
                            count = {5}
                            defaultRating={0}
                            size={20}
                            onFinishRating={(rating) => handleRatingChange('professor', 'knowledge', rating)}
                        />
                    <Text>Clarity</Text>
                        <AirbnbRating
                            count = {5}
                            defaultRating={0}
                            size={20}
                            onFinishRating={(rating) => handleRatingChange('professor', 'clarity', rating)}
                        />
                    <Text>Engagement</Text>
                        <AirbnbRating
                            count = {5}
                            defaultRating={0}
                            size={20}
                            onFinishRating={(rating) => handleRatingChange('professor', 'engagement', rating)}
                        />
                </View>

                <Text style={styles.sectionTitle}>Course Content Rating</Text>
                <View style = {styles.ratingGroup}>
                <Text style={styles.labelText}>Relevance</Text>
                    <AirbnbRating
                        count = {5}
                        defaultRating={0}
                        size={20}
                        onFinishRating={(rating) => handleRatingChange('course', 'relevance', rating)}
                    />
                <Text>Materials</Text>
                    <AirbnbRating
                        count = {5}
                        defaultRating={0}
                        size={20}
                        onFinishRating={(rating) => handleRatingChange('course', 'materials', rating)}
                    />
                <Text>Practical Application</Text>
                    <AirbnbRating
                        count = {5}
                        defaultRating={0}
                        size={20}
                        onFinishRating={(rating) => handleRatingChange('course', 'application', rating)}
                    />

                <Text style = {styles.sectionTitle}>Addition Feedback</Text>
                <TextInput
                  style = {styles.textInput}
                  placeholder='Write your feedback here.....'
                  multiline
                  value={feedback}
                  onChangeText={setFeedback}
                />

                <Button title = "Submit Survey" onPress={handleSubmit}/>
                </View>
            </>
        )}

    </View>
    </ScrollView>
  )
}

export default Survey;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 60,  
        backgroundColor: '#121212',
    },
    title:{
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 10, 
        color: '#38b6ff', 
    },
    subtitle:{
        fontSize: 14, 
        textAlign: 'center', 
        color: 'white',
        marginBottom: 10, 
    },
    sectionTitle: {
        fontSize: 18, 
        fontWeight: 'bold', 
        marginTop: 20, 
        marginBottom: 10, 
        color: 'white',
    },
    ratingGroup:{
        marginBottom: 20, 
    },
    textInput:{
        borderColor: '#38b6ff',
        borderWidth: 1, 
        borderRadius: 8, 
        padding: 10, 
        marginBottom: 20, 
        backgroundColor: '#121212'
    }
})