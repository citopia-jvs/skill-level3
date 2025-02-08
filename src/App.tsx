import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Information from "./pages/Information";
import { UserProvider } from "./provider/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/information" element={<Information />} />
                    </Routes>
                </Router>
            </UserProvider>
        </QueryClientProvider>
    );
};

export default App;
