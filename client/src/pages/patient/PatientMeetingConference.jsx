import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const PatientMeetingConference = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [roomID, setRoomID] = useState(null);
  const [userName, setUserName] = useState('');
  const sidebarRef = useRef(null);
  const { appointmentId } = useParams();
  const [loading, setLoading] = useState(true);
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Teleconsultation Access", path: "/patient/tele-access" },
      { label: "Tele Conference", path: "/patient/patientMeetingConference/:appointmentId" },
    ]);
  }, []);

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

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/appointments/${appointmentId}`);
      const appointmentData = response.data.data;
      setRoomID(appointmentData.roomID);
      setUserName(appointmentData.patientName);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    } finally {
        setLoading(false);
      }
  };

  const initZegoCloudMeeting = async (element) => {
    const appID = 1757979495;
    const serverSecret = "04f46682ad34e9005b14d629441180e3";
    const userID = Date.now().toString();

    if (!roomID) {
      console.error("Room ID is not available");
      return;
    }

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
      roomID: roomID,
      userID: userID,
      userName: userName,
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
    if (videoCallDiv && roomID) {
      initZegoCloudMeeting(videoCallDiv);
    }
  }, [roomID]);

  return (
    <div className="flex">
      <div className="w-full ">
        <div className="container mx-auto py-4 ">
          <header className="flex items-center justify-between bg-white p-4 rounded-xl">
            <h4 className="text-xl font-semibold text-gray-800">Patient Meeting Conference</h4>
          </header>

          <div className="bg-white  rounded-lg p-6">
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
            <div className="text-center mt-4">
              <p>Room ID is not available. Please check the appointment details.</p>
            </div>
          )}
        </div>
      
        </div>
      </div>
    </div>
  );
};

export default PatientMeetingConference;
