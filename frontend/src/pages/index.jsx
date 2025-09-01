
import React from 'react'
import { Link } from "react-router-dom";
import { ArrowRight, Users, BookOpen, Star, Zap, Shield, Heart } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center">
              <img src="/mind.png" className="h-44"/>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Join Our
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Community</span>
              <br />
              for Free
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Discover amazing stories, share your thoughts, and connect with writers from around the world. 
              Start your journey today.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold">10K+ Writers</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold">50K+ Stories</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold">4.9 Rating</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="max-w-md mx-auto mb-16">
            <div className="space-y-4">
              <Link to="/signup" className="block">
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2">
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              
              <Link to="/signin" className="block">
                <button className="w-full bg-white text-gray-700 text-lg font-semibold py-4 px-8 rounded-xl border-2 border-gray-200 shadow-md hover:shadow-lg hover:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 transform hover:-translate-y-1">
                  Sign In
                </button>
              </Link>
            </div>
            
            <div className="text-center mt-6">
              <Link to="/blogs" className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                <span>Browse Stories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-indigo-600" />}
              title="Lightning Fast"
              description="Experience blazing fast loading times and smooth interactions."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-indigo-600" />}
              title="Secure & Private"
              description="Your data is protected with enterprise-grade security measures."
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8 text-indigo-600" />}
              title="Community Driven"
              description="Join a supportive community of passionate writers and readers."
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-xl mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
};

export default Home;
