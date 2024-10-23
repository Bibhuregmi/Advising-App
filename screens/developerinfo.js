import React from "react";
import {View, Text, Image, Linking, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

//dev photos

import bibhu from '../assets/developers/bibhu.jpg';
import shishir from '../assets/developers/shishir.jpg';
import raj from '../assets/developers/raj.jpg';

const teamMember = [
    {
        name: 'Bibhushit Regmi',
        role: 'Lead Fullstack Developer',
        photo: bibhu,
        socials:{
            linkedin: 'https://www.linkedin.com/in/bibhushit-regmi-b00a43214/',
            github: 'https://github.com/Bibhuregmi',
            insta: 'https://www.instagram.com/bibhu_regmi/',
        },
    },
    {
        name: 'Shishir Regmi',
        role: 'Project Lead',
        photo: shishir,
        socials:{
            linkedin: 'https://www.linkedin.com/in/shishir-regmi-358154317/',
            github: 'https://github.com/devShree2121',
            insta:'https://www.instagram.com/shreeee2121/',
        },  
    },
    {
        name: 'Raj Ghimire',
        role: 'UI/UX Developer and QA',
        photo: raj,
        socials:{
            linkedin: 'https://www.reddit.com/r/ProgrammerHumor/comments/54dmni/when_fixing_one_bug_leads_to_another/', //to be added
            github: 'https://www.reddit.com/r/ProgrammerHumor/comments/54dmni/when_fixing_one_bug_leads_to_another/', // to be added
            insta:'https://www.reddit.com/r/ProgrammerHumor/comments/54dmni/when_fixing_one_bug_leads_to_another/', // to be added
        },
    },
];

const TeamMembers = () => {
    return(
        <ScrollView contentContainerStyle={styles.container}>
            {teamMember.map((member, index) => (
                <View key = {index} style = {styles.card}>
                    <Image source={member.photo} style={styles.photo}/>
                    <Text style= {styles.name}>{member.name}</Text>
                    <Text style= {styles.role}>{member.role}</Text>
                    <View style = {styles.socials}>
                    <TouchableOpacity onPress={() => Linking.openURL(member.socials.github)}>
                        <Ionicons name = "logo-github" size ={40} color = '#90caf9' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(member.socials.linkedin)}>
                        <Ionicons name = "logo-linkedin" size ={40} color = '#90caf9' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(member.socials.insta)}>
                        <Ionicons name = "logo-instagram" size ={40} color = '#90caf9' />
                    </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#121212',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#444444',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        marginTop: 60,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
       marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#e0e0e0'
    },
    role: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
        color: '#b0b0b0'
    },
    socials: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    link: {
        fontSize: 16,
        color: '#007bff',
        marginHorizontal: 10,
    },
});
export default TeamMembers;