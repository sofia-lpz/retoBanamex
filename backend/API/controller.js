import * as chatbot from '../loopita/loopita.js';
import * as service from './service.js';

export const chat = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'Prompt is required' 
      });
    }

    const response = await chatbot.chat(prompt);
    
    return res.status(200).json({
      success: true,
      response: response
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while processing your request'
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { filter } = req.query;
    const users = await service.getUsers(filter);

    return res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error in getUsers endpoint:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while fetching users'
    });
  }
}
