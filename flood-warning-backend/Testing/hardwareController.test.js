const { linkHardwareToStationAndFetchData } = require('../controllers/hardwareController'); // Adjust the path as needed
const Hardware = require('../models/Hardware');
const Station = require('../models/Station');
const SensorReading = require('../models/SensorReading');
const axios = require('axios');

// Mock Mongoose models and Axios
jest.mock('../models/Hardware');
jest.mock('../models/Station');
jest.mock('../models/SensorReading');
jest.mock('axios');

describe('linkHardwareToStationAndFetchData', () => {
    const mockReq = {
      body: {
        hardwareID: 'mockHardwareID',
        stationId: '6123abc1234efgh56789ijkl', // Ensure this is a valid ObjectId format
      },
    };
  
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should link hardware to station and fetch sensor data', async () => {
      // Set up mocks
      Hardware.findOne.mockResolvedValue({ _id: 'mockHardwareID', readings: [], save: jest.fn() });
      Station.findOne.mockResolvedValue(null); // Simulate hardware is not linked yet
      Station.findById.mockResolvedValue({ _id: '6123abc1234efgh56789ijkl', hardware: [], save: jest.fn() });
      axios.get.mockResolvedValue({ data: [{ equipment_id: 'mockHardwareID', id: 'sensorId1', measurement: 25 }] });
      SensorReading.findOne.mockResolvedValue(null); // No existing sensor reading
  
      await linkHardwareToStationAndFetchData(mockReq, mockRes);
  
      // Verify calls and responses
      expect(Hardware.findOne).toHaveBeenCalledWith({ equipment_id: 'mockHardwareID' });
      expect(Station.findOne).toHaveBeenCalledWith({ hardware: 'mockHardwareID' }); // Update to check correct value
      expect(Station.findById).toHaveBeenCalledWith('6123abc1234efgh56789ijkl');
      expect(axios.get).toHaveBeenCalledWith('https://run.mocky.io/v3/fac87583-0904-4b86-b3da-bd4c2af4bede');
      expect(SensorReading.findOne).toHaveBeenCalledWith({ sensorId: 'sensorId1' });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Hardware linked and data fetched successfully" }));
    });
  
    it('should return 404 if hardware is not found', async () => {
      Hardware.findOne.mockResolvedValue(null); // Simulate hardware not found
  
      await linkHardwareToStationAndFetchData(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Hardware not found" });
    });
  
    it('should return 400 if hardware is already linked to a station', async () => {
      Hardware.findOne.mockResolvedValue({ _id: 'mockHardwareID', readings: [] });
      Station.findOne.mockResolvedValue({ _id: 'mockStationId' }); // Simulate hardware is already linked
  
      await linkHardwareToStationAndFetchData(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Hardware already linked to a station" });
    });
  
    // Additional tests...
  });
  
