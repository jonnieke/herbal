import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import FloatingAIAssistant from "@/components/ui/floating-ai-assistant";
import Home from "@/pages/home";
import Herbs from "@/pages/herbs";
import Wellbeing from "@/pages/wellbeing";
import MentalHealth from "@/pages/mental-health";
import Energy from "@/pages/energy";
import Sleep from "@/pages/sleep";
import WeightBalance from "@/pages/weight-balance";
import GeneralWellness from "@/pages/general-wellness";
import Ailments from "@/pages/ailments";
import Videos from "@/pages/videos";
import Community from "@/pages/community";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import SafetyGuidelines from "@/pages/safety-guidelines";
import PrivacyPolicy from "@/pages/privacy-policy";
import NotFound from "@/pages/not-found";
function Router() {
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navigation, {}), _jsx("main", { className: "flex-1", children: _jsxs(Switch, { children: [_jsx(Route, { path: "/", component: Home }), _jsx(Route, { path: "/herbs", component: Herbs }), _jsx(Route, { path: "/wellbeing", component: Wellbeing }), _jsx(Route, { path: "/mental-health", component: MentalHealth }), _jsx(Route, { path: "/energy", component: Energy }), _jsx(Route, { path: "/sleep", component: Sleep }), _jsx(Route, { path: "/weight-balance", component: WeightBalance }), _jsx(Route, { path: "/general-wellness", component: GeneralWellness }), _jsx(Route, { path: "/ailments", component: Ailments }), _jsx(Route, { path: "/videos", component: Videos }), _jsx(Route, { path: "/community", component: Community }), _jsx(Route, { path: "/about", component: About }), _jsx(Route, { path: "/contact", component: Contact }), _jsx(Route, { path: "/safety-guidelines", component: SafetyGuidelines }), _jsx(Route, { path: "/privacy-policy", component: PrivacyPolicy }), _jsx(Route, { component: NotFound })] }) }), _jsx(Footer, {}), _jsx(FloatingAIAssistant, {})] }));
}
function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(Router, {})] }) }));
}
export default App;
