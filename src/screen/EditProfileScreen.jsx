import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authAxios } from '../services/config';
import { setUser } from '../Redux/Reducers/authSlice';
import Header from '../Header';
import Footer from '../Footer';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import PhoneInput from 'react-native-phone-number-input';

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const colorScheme = useColorScheme();
  const phoneInput = useRef(null);

  // Initialize form values from the user profile, ensuring they are pre-filled
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.profile?.dateOfBirth || '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [contactNumber, setContactNumber] = useState(user?.profile?.contactNumber || '');
  const [countryCode, setCountryCode] = useState(user?.profile?.countryCode || '+91');
  const [gender, setGender] = useState(user?.profile?.gender || 'Male');
  const [about, setAbout] = useState(user?.profile?.about || '');

  // Sync form state with Redux user data
  useEffect(() => {
    if (user && user.profile) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setDateOfBirth(user.profile.dateOfBirth || '');
      setContactNumber(user.profile.contactNumber || '');
      setCountryCode(user.profile.countryCode || '+91');
      setGender(user.profile.gender || 'Male');
      setAbout(user.profile.about || '');
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const formattedNumber = phoneInput.current?.getNumberAfterPossiblyEliminatingZero()?.formattedNumber || contactNumber;
      const updatedData = {
        firstName,
        lastName,
        dateOfBirth,
        contactNumber: formattedNumber,
        countryCode: phoneInput.current?.getCountryCode() || countryCode,
        gender,
        about,
      };

      const response = await authAxios().put('/profile/updateProfile', updatedData);
      if (response.data.success) {
        dispatch(setUser(response.data.updatedUserDetails)); // Update the Redux state
        alert('Profile updated successfully');
      }
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(dateOfBirth);
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate.toISOString().split('T')[0]);
  };

  return (
    <View style={colorScheme === 'dark' ? styles.containerDark : styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.form}>
          <Text style={colorScheme === 'dark' ? styles.labelDark : styles.label}>
            First Name
          </Text>
          <TextInput
            style={colorScheme === 'dark' ? styles.inputDark : styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#777'}
          />

          <Text style={colorScheme === 'dark' ? styles.labelDark : styles.label}>
            Last Name
          </Text>
          <TextInput
            style={colorScheme === 'dark' ? styles.inputDark : styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#777'}
          />

          <Text style={colorScheme === 'dark' ? styles.labelDark : styles.label}>
            Email (Not Editable)
          </Text>
          <TextInput
            style={[
              colorScheme === 'dark' ? styles.inputDark : styles.input,
              styles.disabledInput,
            ]}
            value={user?.email}
            editable={false}
          />

          <Text style={colorScheme === 'dark' ? styles.labelDark : styles.label}>
            Date of Birth
          </Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color="gray"
              style={styles.icon}
            />
            <Text>{dateOfBirth ? dateOfBirth : 'Select Date'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}

          <Text style={colorScheme === 'dark' ? styles.labelDark : styles.label}>
            Contact Number
          </Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={contactNumber}
            defaultCode="IN"
            layout="first"
            onChangeFormattedText={setContactNumber}
            textContainerStyle={[
              styles.textContainer,
              colorScheme === 'dark' && styles.textContainerDark,
            ]}
            textInputStyle={colorScheme === 'dark' ? styles.inputDark : styles.input}
            codeTextStyle={colorScheme === 'dark' ? styles.codeTextDark : styles.codeText}
            flagButtonStyle={styles.flagButton}
            maxLength={10} // limiting phone number to 10 digits
          />

          <Text style={colorScheme === 'dark' ? styles.labelDark : styles.label}>
            Gender
          </Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={gender}
              style={styles.picker}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          <Text style={colorScheme === 'dark' ? styles.labelDark : styles.label}>
            About Us (250 words max)
          </Text>
          <TextInput
            style={styles.textArea}
            value={about}
            onChangeText={setAbout}
            multiline={true}
            numberOfLines={4}
            maxLength={250}
            placeholder="Tell us about yourself..."
            placeholderTextColor={colorScheme === 'dark' ? '#ccc' : '#777'}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
  },
  form: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  labelDark: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#f0f0f0',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  inputDark: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderColor: '#555',
    borderWidth: 1,
  },
  disabledInput: {
    backgroundColor: '#e9e9e9',
  },
  datePicker: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textContainerDark: {
    backgroundColor: '#333',
    borderColor: '#555',
  },
  codeText: {
    color: '#000',
    fontSize: 16,
  },
  codeTextDark: {
    color: '#fff',
    fontSize: 16,
  },
  flagButton: {
    marginLeft: 10,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textArea: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    textAlignVertical: 'top',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen;
