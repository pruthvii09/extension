import { useEffect, useState } from "react";
import { IoEarth } from "react-icons/io5";
import { GiModernCity } from "react-icons/gi";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [locationInfo, setLocationInfo] = useState({});
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };
    fetchIpAddress();
  }, []);
  const handleLocation = async () => {
    setIsLoading(true);
    const apiKey = process.env.REACT_APP_API_KEY; // Corrected environment variable name
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`
      );
      const data = await response.json();
      setLocationInfo({
        country: data.location.country,
        city: data.location.city,
      });
      console.log(locationInfo);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching location information:", error);
    }
  };
  return (
    <div>
      <div className="flex items-start justify-start flex-col gap-1">
        <div className="flex items-center gap-1">
          <IoEarth className="text-xl text-[#405cf5]" />
          <h3 className="text-lg ">
            Country : {isLoading ? "Loading..." : <>{locationInfo.country}</>}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <GiModernCity className="text-xl text-[#405cf5]" />
          <h3 className="text-lg">
            City : {isLoading ? "Loading..." : <>{locationInfo.city}</>}
          </h3>
        </div>
        <button
          className="p-2 text-xs bg-[#405cf5] rounded-md text-white cursor-pointer"
          onClick={handleLocation}
        >
          Get Location
        </button>
      </div>
    </div>
  );
}

export default App;
