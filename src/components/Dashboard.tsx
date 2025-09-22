import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Home, 
  Users, 
  AlertTriangle, 
  MapPin, 
  FileText, 
  Settings, 
  Bell, 
  User,
  Phone,
  Eye,
  Send,
  Check,
  Brain,
  BarChart3,
  Truck,
  X
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import neIndiaMap from 'figma:asset/711b37be16cea09cb3892059da8d795ba928081a.png';
import { TouristProfile } from './TouristProfile';
import { AIInsights } from './AIInsights';
import { RiskZones } from './RiskZones';
import { PostTripManagement } from './PostTripManagement';
import { RescueOperations } from './RescueOperations';
import { AllTourists } from './AllTourists';
import { AlertsPage } from './AlertsPage';
import { toast } from 'sonner@2.0.3';

interface DashboardProps {
  userRole: string;
  onLogout: () => void;
}

interface Alert {
  id: string;
  type: 'sos' | 'deviation' | 'inactivity';
  tourist: string;
  tripId: string;
  location: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
}

interface Tourist {
  id: string;
  name: string;
  tripId: string;
  nationality: string;
  phone: string;
  status: 'safe' | 'warning' | 'sos';
  location: { lat: number; lng: number; name: string };
  lastSeen: string;
}

export function Dashboard({ userRole, onLogout }: DashboardProps) {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [showAlertRibbon, setShowAlertRibbon] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);
  const [alertIndex, setAlertIndex] = useState(0);

  // Northeast India locations
  const neLocations = [
    'Kaziranga National Park, Assam',
    'Tawang Monastery, Arunachal Pradesh',
    'Mawlynnong Village, Meghalaya',
    'Loktak Lake, Manipur',
    'Dzukou Valley, Nagaland',
    'Tsomgo Lake, Sikkim',
    'Namdapha National Park, Arunachal Pradesh',
    'Ujjayanta Palace, Tripura'
  ];

  // Mock data with Northeast India locations
  const tourists: Tourist[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      tripId: 'TRIP-00123',
      nationality: 'India',
      phone: '+91-98765-43210',
      status: 'safe',
      location: { lat: 26.7459, lng: 94.2157, name: 'Guwahati, Assam' },
      lastSeen: '2 minutes ago'
    },
    {
      id: '2',
      name: 'James Miller',
      tripId: 'TRIP-00124',
      nationality: 'USA',
      phone: '+1-555-123-4567',
      status: 'sos',
      location: { lat: 26.6307, lng: 93.2229, name: 'Kaziranga National Park, Assam' },
      lastSeen: '30 seconds ago'
    },
    {
      id: '3',
      name: 'Liu Wei',
      tripId: 'TRIP-00125',
      nationality: 'China',
      phone: '+86-138-0013-8000',
      status: 'warning',
      location: { lat: 25.5788, lng: 91.8933, name: 'Shillong, Meghalaya' },
      lastSeen: '15 minutes ago'
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      tripId: 'TRIP-00126',
      nationality: 'UK',
      phone: '+44-20-7946-0958',
      status: 'safe',
      location: { lat: 27.3389, lng: 88.6065, name: 'Gangtok, Sikkim' },
      lastSeen: '5 minutes ago'
    }
  ];

  const alertMessages = [
    {
      id: '1',
      type: 'sos' as const,
      tourist: 'James Miller',
      tripId: 'TRIP-00124',
      location: 'Kaziranga National Park, Assam',
      time: '30 seconds ago',
      severity: 'high' as const
    },
    {
      id: '2',
      type: 'deviation' as const,
      tourist: 'Liu Wei',
      tripId: 'TRIP-00125',
      location: 'Shillong, Meghalaya',
      time: '15 minutes ago',
      severity: 'medium' as const
    },
    {
      id: '3',
      type: 'sos' as const,
      tourist: 'Emma Wilson',
      tripId: 'TRIP-00127',
      location: 'Tawang Monastery, Arunachal Pradesh',
      time: '2 minutes ago',
      severity: 'high' as const
    },
    {
      id: '4',
      type: 'inactivity' as const,
      tourist: 'David Chen',
      tripId: 'TRIP-00128',
      location: 'Imphal, Manipur',
      time: '1 hour ago',
      severity: 'medium' as const
    }
  ];

  const stats = {
    totalTourists: 284,
    safeTourists: 278,
    highRiskZones: 6,
    activeAlerts: alertMessages.length
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'tourists', icon: Users, label: 'All Tourists' },
    { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
    { id: 'risk-zones', icon: MapPin, label: 'High Risk Zones' },
    { id: 'rescue-ops', icon: Truck, label: 'Rescue Operations' },
    { id: 'ai-insights', icon: Brain, label: 'AI Insights' },
    { id: 'records', icon: FileText, label: 'Tourist Records (DID)' },
    { id: 'post-trip', icon: BarChart3, label: 'Completed Tours' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  // Alert ribbon timing
  useEffect(() => {
    // Show first alert after 10 seconds of login
    const initialTimer = setTimeout(() => {
      setCurrentAlert(alertMessages[0]);
      setShowAlertRibbon(true);
    }, 10000);

    // Show new alerts every 2 minutes
    const intervalTimer = setInterval(() => {
      const nextIndex = (alertIndex + 1) % alertMessages.length;
      setAlertIndex(nextIndex);
      setCurrentAlert(alertMessages[nextIndex]);
      setShowAlertRibbon(true);
    }, 120000); // 2 minutes

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [alertIndex]);

  const handleViewDetails = () => {
    const tourist = tourists.find(t => t.tripId === currentAlert?.tripId);
    if (tourist) {
      setSelectedTourist(tourist);
      setActiveView('tourist-profile');
      setShowAlertRibbon(false);
    }
  };

  const handleDispatchHelp = () => {
    setShowAlertRibbon(false);
    toast.success('Alert sent to nearest police unit successfully');
  };

  const handleAcknowledge = () => {
    setShowAlertRibbon(false);
    toast.success('Alert acknowledged');
  };

  // Route to different components
  if (selectedTourist && activeView === 'tourist-profile') {
    return (
      <TouristProfile 
        tourist={selectedTourist} 
        onBack={() => {
          setSelectedTourist(null);
          setActiveView('dashboard');
        }} 
      />
    );
  }

  if (activeView === 'tourists') {
    return <AllTourists tourists={tourists} onBack={() => setActiveView('dashboard')} onSelectTourist={(tourist) => {
      setSelectedTourist(tourist);
      setActiveView('tourist-profile');
    }} />;
  }

  if (activeView === 'alerts') {
    return <AlertsPage alerts={alertMessages} onBack={() => setActiveView('dashboard')} onSelectTourist={(tourist) => {
      setSelectedTourist(tourist);
      setActiveView('tourist-profile');
    }} tourists={tourists} />;
  }

  if (activeView === 'ai-insights') {
    return <AIInsights onBack={() => setActiveView('dashboard')} />;
  }

  if (activeView === 'risk-zones') {
    return <RiskZones onBack={() => setActiveView('dashboard')} />;
  }

  if (activeView === 'rescue-ops') {
    return <RescueOperations onBack={() => setActiveView('dashboard')} />;
  }

  if (activeView === 'post-trip') {
    return <PostTripManagement onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dynamic Alert Ribbon */}
      {showAlertRibbon && currentAlert && (
        <div className="w-full py-3 px-4 bg-red-600 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="animate-pulse">🚨</span>
              <span>
                SOS Alert detected near {currentAlert.location} - Tourist: {currentAlert.tourist}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={handleViewDetails}
              >
                View Details
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={handleDispatchHelp}
              >
                Dispatch Help
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={handleAcknowledge}
              >
                Acknowledge
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setShowAlertRibbon(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-screen flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">NE India Safety Portal</h2>
                <p className="text-sm text-muted-foreground capitalize">{userRole} Dept.</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveView(item.id)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-white shadow-sm p-4 flex items-center justify-between border-b">
            <h1 className="text-2xl font-semibold">Northeast India Tourist Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
                <Badge className="ml-1 bg-red-500">{stats.activeAlerts}</Badge>
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Map Section */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Northeast India Tourist Map</CardTitle>
                    <CardDescription>Real-time location tracking across NE states</CardDescription>
                  </CardHeader>
                  <CardContent className="relative h-96">
                    <ImageWithFallback
                      src={neIndiaMap}
                      alt="Northeast India map"
                      className="w-full h-full object-cover rounded-md"
                    />
                    
                    {/* Tourist Markers */}
                    <div className="absolute top-20 left-32">
                      <div 
                        className="w-4 h-4 bg-green-500 rounded-full animate-pulse cursor-pointer"
                        onClick={() => {
                          setSelectedTourist(tourists[0]);
                          setActiveView('tourist-profile');
                        }}
                        title="Priya Sharma - Guwahati, Assam"
                      />
                    </div>
                    <div className="absolute top-32 right-28">
                      <div 
                        className="w-4 h-4 bg-red-500 rounded-full animate-ping cursor-pointer"
                        onClick={() => {
                          setSelectedTourist(tourists[1]);
                          setActiveView('tourist-profile');
                        }}
                        title="James Miller - Kaziranga, Assam (SOS)"
                      />
                    </div>
                    <div className="absolute bottom-20 left-20">
                      <div 
                        className="w-4 h-4 bg-orange-500 rounded-full animate-pulse cursor-pointer"
                        onClick={() => {
                          setSelectedTourist(tourists[2]);
                          setActiveView('tourist-profile');
                        }}
                        title="Liu Wei - Shillong, Meghalaya"
                      />
                    </div>
                    <div className="absolute top-40 right-16">
                      <div 
                        className="w-4 h-4 bg-green-500 rounded-full animate-pulse cursor-pointer"
                        onClick={() => {
                          setSelectedTourist(tourists[3]);
                          setActiveView('tourist-profile');
                        }}
                        title="Sarah Johnson - Gangtok, Sikkim"
                      />
                    </div>

                    {/* Sensitive Zones */}
                    <div className="absolute top-16 left-16 w-24 h-16 bg-orange-300/40 rounded-lg" title="High Risk Zone" />
                    <div className="absolute bottom-16 right-24 w-20 h-20 bg-orange-300/40 rounded-lg" title="Sensitive Area" />

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-md shadow-sm">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                          <span>Safe tourists</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                          <span>Sensitive zones</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                          <span>SOS alerts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-300 rounded-sm" />
                          <span>High risk areas</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Panel */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-blue-600">{stats.totalTourists}</div>
                        <div className="text-sm text-muted-foreground">Total Tourists</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-red-600">{stats.highRiskZones}</div>
                        <div className="text-sm text-muted-foreground">High Risk Zones</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Active Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Active Alerts
                      <Badge variant="destructive">{stats.activeAlerts}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-80 overflow-y-auto">
                    {alertMessages.slice(0, 3).map((alert) => (
                      <Alert key={alert.id} className={
                        alert.severity === 'high' ? 'border-red-200 bg-red-50' : 
                        alert.severity === 'medium' ? 'border-orange-200 bg-orange-50' :
                        'border-yellow-200 bg-yellow-50'
                      }>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="space-y-1">
                            <div className="font-medium">{alert.tourist}</div>
                            <div className="text-sm text-muted-foreground">
                              {alert.type === 'sos' ? '🚨 SOS Alert' : 
                               alert.type === 'deviation' ? '⚠️ Route Deviation' :
                               '⏰ Prolonged Inactivity'}
                            </div>
                            <div className="text-sm">{alert.location}</div>
                            <div className="text-xs text-muted-foreground">{alert.time}</div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </CardContent>
                </Card>

                {/* Tourist Distribution by State */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tourist Distribution by State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { state: 'Assam', count: 89, color: 'bg-blue-500' },
                        { state: 'Meghalaya', count: 67, color: 'bg-green-500' },
                        { state: 'Arunachal Pradesh', count: 45, color: 'bg-purple-500' },
                        { state: 'Sikkim', count: 38, color: 'bg-orange-500' },
                        { state: 'Manipur', count: 28, color: 'bg-red-500' },
                        { state: 'Nagaland', count: 17, color: 'bg-yellow-500' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{item.state}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div 
                                className={`h-full rounded-full ${item.color}`}
                                style={{ width: `${(item.count / 89) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-8">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}