import User from "../models/user.model.js";
import  uploadOnCloudinary  from "../utils/cloudinary.js";


const registerUser = async (req, res, next) => {
    try {
      const { username, password, email, address,role } = req.body;
  
      if (!username || !password || !email || !address) {
        return res.status(400).json({ message: "Please provide all required credentials" });
      }
  
      const existedUser = await User.findOne({ email });
      if (existedUser) {
        return res.status(400).json({ message: "User Already Exists" });
      }
  
      console.log(req.file);
      let avatarUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"; // Default avatar
  
      if (req.file) {
        // Upload image to Cloudinary
        const localFilePath = req.file.path;
        try {
          const uploadResult = await uploadOnCloudinary(localFilePath);
          console.log("Cloudinary Upload Result:", uploadResult);
  
          if (uploadResult && uploadResult.url) {
            avatarUrl = uploadResult.url;
          }
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          return res.status(500).json({ message: "Image upload failed" });
        }
      }
  
      // Create new user
      const user = await User.create({
        username,
        password, // Will be hashed by the pre-save hook
        email,
        address, // Adding required address field
        avatar: avatarUrl,
        role
      });
  
      if (!user) {
        return res.status(500).json({ message: "Error creating user" });
      }
  
      const createdUser = await User.findById(user._id).select("-password");
      if (!createdUser) {
        return res.status(500).json({ message: "Error fetching user" });
      }
  
      const token = createdUser.generatetoken();
      res.status(201).json({
        createdUser,
        token,
        message: "User created successfully"
      });
    } catch (error) {
      next(error);
    }
  };
  
  const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
      }
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }
      
      const correctPassword = await user.isPasswordCorrect(password);
      if (!correctPassword) {
        return res.status(401).json({ message: "Password is incorrect" });
      }
  
      // Don't send password in response
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      
      const token = user.generatetoken();
      res.status(200).json({
        user: userWithoutPassword,
        token,
        message: "User logged in successfully"
      });
    } catch (error) {
      next(error);
    }
  };
  
// user.controller.js additions
export const getUser = async (req, res, next) => {
    try {
      // User is already available from auth middleware
      // We can populate favorite books, cart items, and orders if needed
      const user = await User.findById(req.user._id)
        .select('-password')
        .populate('favourites', 'title author price coverImage') // Assuming these fields exist in Book model
        .populate('cart', 'title author price coverImage')
        .populate('order');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      console.error('Get user error:', error);
      next(error);
    }
  };
  
  // For updating user profile
  export const updateUser = async (req, res, next) => {
    try {
      const { username, email, address } = req.body;
      const userId = req.user._id;
      
      // Find user by id
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Update fields if provided
      if (username) user.username = username;
      if (email) user.email = email;
      if (address) user.address = address;
      
      // Handle avatar upload if present
      if (req.file) {
        const localFilePath = req.file.path;
        try {
          const uploadResult = await uploadOnCloudinary(localFilePath);
          if (uploadResult && uploadResult.url) {
            user.avatar = uploadResult.url;
          }
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          return res.status(500).json({ message: "Image upload failed" });
        }
      }
      
      await user.save();
      
      // Return updated user without password
      const updatedUser = await User.findById(userId).select('-password');
      
      return res.status(200).json({
        success: true,
        user: updatedUser,
        message: 'User updated successfully'
      });
    } catch (error) {
      console.error('Update user error:', error);
      next(error);
    }
  };
  export {
    registerUser,
    loginUser,
   
   
  }