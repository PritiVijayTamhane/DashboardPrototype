import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Search,
  Clock,
  MapPin,
  User,
  Eye,
  CheckCircle,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

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

interface AlertsPageProps {
  alerts: Alert[];
  tourists: Tourist[];
  onBack: () => void;
  onSelectTourist: (tourist: Tourist) => void;
}

export function AlertsPage({ alerts, tourists, onBack, onSelectTourist }: AlertsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [resolvedAlerts, setResolvedAlerts] = useState<string[]>([]);

  const handleResolveAlert = (alertId: string) => {
    setResolvedAlerts(prev => [...prev, alertId]);
    toast.success('Alert marked as resolved');
  };

  const handleViewTourist = (tripId: string) => {
    const tourist = tourists.find(t => t.tripId === tripId);
    if (tourist) {
      onSelectTourist(tourist);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sos': return '🚨';
      case 'deviation': return '⚠️';
      case 'inactivity': return '⏰';
      default: return '⚠️';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'sos': return 'SOS Alert';
      case 'deviation': return 'Route Deviation';
      case 'inactivity': return 'Prolonged Inactivity';
      default: return 'Unknown Alert';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (resolvedAlerts.includes(alert.id)) return false;

    const matchesSearch = 
      alert.tourist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.tripId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;

    return matchesSearch && matchesType && matchesSeverity;
  });

  const stats = {
    total: alerts.filter(a => !resolvedAlerts.includes(a.id)).length,
    high: alerts.filter(a => a.severity === 'high' && !resolvedAlerts.includes(a.id)).length,
    sos: alerts.filter(a => a.type === 'sos' && !resolvedAlerts.includes(a.id)).length,
    resolved: resolvedAlerts.length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            Alert Management Center
          </h1>
        </div>
        <Badge variant="destructive">
          {stats.total} Active Alerts
        </Badge>
      </div>

      <div className="p-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-red-600">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Active Alerts</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-orange-600">{stats.high}</div>
                  <div className="text-sm text-muted-foreground">High Priority</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-purple-600">{stats.sos}</div>
                  <div className="text-sm text-muted-foreground">SOS Alerts</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-green-600">{stats.resolved}</div>
                  <div className="text-sm text-muted-foreground">Resolved Today</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Alerts Panel */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Alert List</CardTitle>
                <CardDescription>
                  All unresolved alerts requiring immediate attention
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Bar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by tourist name, trip ID, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Alert Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sos">SOS</SelectItem>
                  <SelectItem value="deviation">Deviation</SelectItem>
                  <SelectItem value="inactivity">Inactivity</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{getTypeIcon(alert.type)}</span>
                          <div>
                            <div className="font-medium text-lg">{alert.tourist}</div>
                            <div className="text-sm text-muted-foreground">
                              Trip ID: {alert.tripId}
                            </div>
                          </div>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="space-y-1">
                          <div className="font-medium">{getTypeLabel(alert.type)}</div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{alert.time}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleViewTourist(alert.tripId)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Tourist Profile
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toast.success('Rescue unit dispatched')}
                          >
                            Dispatch Help
                          </Button>
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Resolved
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {resolvedAlerts.length > 0 && searchTerm === '' && typeFilter === 'all' && severityFilter === 'all' 
                  ? 'All alerts have been resolved! 🎉'
                  : 'No alerts found matching your search criteria'
                }
              </div>
            )}
          </CardContent>
        </Card>

        {/* Alert Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alert Activity</CardTitle>
            <CardDescription>
              Chronological timeline of alert events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">New SOS Alert</div>
                  <div className="text-sm text-muted-foreground">
                    James Miller triggered emergency alert at Kaziranga National Park - 30 seconds ago
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Route Deviation Detected</div>
                  <div className="text-sm text-muted-foreground">
                    Liu Wei deviated 5km from planned route near Shillong - 15 minutes ago
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Alert Resolved</div>
                  <div className="text-sm text-muted-foreground">
                    Tourist located and confirmed safe at Tawang Monastery - 1 hour ago
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Inactivity Alert</div>
                  <div className="text-sm text-muted-foreground">
                    No movement detected for tourist at Imphal - 2 hours ago
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}