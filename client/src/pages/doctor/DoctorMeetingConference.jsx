import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import noRecordImage from "../../assets/images/nodoctor.png"; // Import the "No Record" image

const PatientMeetingConference = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [roomID, setRoomID] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const sidebarRef = useRef(null);
  const { appointmentId } = useParams();

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Fetch appointment details (room ID and user name) from the backend
  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`https://patient-management-system-1-8zui.onrender.com/api/appointments/${appointmentId}`);
      const appointmentData = response.data.data;
      setRoomID(appointmentData.roomID);
      setUserName(appointmentData.patientName);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize Zego meeting using room ID and user name
  const initZegoCloudMeeting = async (element) => {
    if (!roomID || !userName) return;

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
  }, [roomID, userName]);

  return (
    <div className="flex flex-col w-full bg-gray-100">
      <div className="container mx-auto p-6">
        <header className="flex items-center justify-between bg-white shadow-md p-4 rounded-md mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Meeting Conference</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-800"
          >
            {isSidebarOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </header>

        <div className="bg-white rounded-lg p-6">
          {loading ? (
            <div className="text-center mt-4">
              <p>Loading...</p>
            </div>
          ) : roomID && userName ? (
            <div
              id="video-call-container"
              className="w-full h-[80vh] mt-6 bg-gray-300 rounded-lg"
            >
              {/* Zego Meeting will be initialized here */}
            </div>
          ) : (
            <div className="flex flex-col items-center mt-8">
              <img
                src={noRecordImage}
                alt="No Appointment Found"
                className="w-96 mb-4"
              />
              <p className="text-gray-500 text-lg">No Appointment Found</p>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <div
            ref={sidebarRef}
            className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-6 z-50 transition-transform transform translate-x-0"
          >
            <button
              onClick={closeSidebar}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes className="text-2xl" />
            </button>
            <nav className="mt-8">
              <ul className="space-y-4">
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer">Home</li>
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer">Appointments</li>
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer">Settings</li>
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer">Logout</li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMeetingConference;
