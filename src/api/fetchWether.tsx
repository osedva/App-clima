const API_KEY = "245d9e44a8002e838af9fc0170ec1d22";

export const getWaetherByCoords = async (LAT: number, LON: number): Promise<any> => {
    const API_COORDS = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`;
    
    const response = await fetch(API_COORDS);
    const data = await response.json();
    return data;
};

export const getWaetherBySearch = async (CITY: string): Promise<any> => {
    const API_CITY = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;

    const response = await fetch(API_CITY);
    const respData = await response.json();

    return respData; 
    
    
}