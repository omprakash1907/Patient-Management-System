import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DoctorMeetingConference = () => {
  const [roomID, setRoomID] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const { appointmentId } = useParams();

  // Fetch room ID and user name based on appointment details
  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/appointments/${appointmentId}`);
      const appointmentData = response.data.data;
      setRoomID(appointmentData.roomID);
      setUserName(appointmentData.doctorName);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize Zego Meeting once roomID and userName are available
  const initZegoCloudMeeting = async (element) => {
    if (!roomID || !userName) return; // Only initialize when both are available

    const appID = 1757979495;
    const serverSecret = "04f46682ad34e9005b14d629441180e3";
    const userID = Date.now().toString();
    
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
        },
      ],
      roomID,
      userID,
      userName,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onUserAvatarSetter: (userList) => {
        userList.forEach(user => {
          user.setUserAvatar("/assets/images/Avatar-2.png");
        });
      },
    });
  };

  useEffect(() => {
    fetchAppointmentDetails();
  }, [appointmentId]);

  useEffect(() => {
    const videoCallDiv = document.getElementById('video-call-container');
    if (videoCallDiv && roomID && userName) {
      initZegoCloudMeeting(videoCallDiv);
    }
  }, [roomID, userName]); // Re-run only when roomID and userName are available

  return (
    <div className="flex flex-col w-full bg-gray-100">
      <div className="container p-6 bg-gray-100 flex-1">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800">Meeting Conference</h1>
          
          {loading ? (
            <div className="text-center mt-4">
              <p>Loading...</p>
            </div>
          ) : roomID && userName ? (
            <div id="video-call-container" className="w-full h-[80vh] mt-6 bg-gray-300 rounded-lg">
              {/* Zego Meeting will be initialized here */}
            </div>
          ) : (
            <div className="text-center mt-4">
              <p>Room ID is not available. Please check the appointment details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorMeetingConference;
