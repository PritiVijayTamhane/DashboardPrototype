import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Filter,
  MapPin,
  Eye
} from 'lucide-react';

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

interface AllTouristsProps {
  tourists: Tourist[];
  onBack: () => void;
  onSelectTourist: (tourist: Tourist) => void;
}

export function AllTourists({ tourists, onBack, onSelectTourist }: AllTouristsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'sos': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCountryFlag = (nationality: string) => {
    const flags: { [key: string]: string } = {
      'India': '🇮🇳',
      'USA': '🇺🇸',
      'UK': '🇬🇧',
      'China': '🇨🇳',
      'Japan': '🇯🇵',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Canada': '🇨🇦'
    };
    return flags[nationality] || '🏳️';
  };

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = 
      tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.tripId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourist.location.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || tourist.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tourists.length,
    safe: tourists.filter(t => t.status === 'safe').length,
    warning: tourists.filter(t => t.status === 'warning').length,
    sos: tourists.filter(t => t.status === 'sos').length
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
            <Users className="w-8 h-8 text-blue-600" />
            All Tourists in Northeast India
          </h1>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {tourists.length} Active Tourists
        </Badge>
      </div>

      <div className="p-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-blue-600">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Tourists</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-green-600">{stats.safe}</div>
                <div className="text-sm text-muted-foreground">Safe</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-orange-600">{stats.warning}</div>
                <div className="text-sm text-muted-foreground">In Sensitive Zone</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-red-600">{stats.sos}</div>
                <div className="text-sm text-muted-foreground">SOS Alerts</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tourist Directory</CardTitle>
                <CardDescription>
                  Complete list of tourists currently in Northeast India
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Bar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, trip ID, nationality, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="safe">Safe</SelectItem>
                  <SelectItem value="warning">In Sensitive Zone</SelectItem>
                  <SelectItem value="sos">SOS Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tourist Name</TableHead>
                  <TableHead>Trip ID (DID)</TableHead>
                  <TableHead>Nationality</TableHead>
                  <TableHead>Current Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTourists.map((tourist) => (
                  <TableRow key={tourist.id}>
                    <TableCell className="font-medium">{tourist.name}</TableCell>
                    <TableCell className="font-mono text-sm">{tourist.tripId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCountryFlag(tourist.nationality)} {tourist.nationality}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{tourist.location.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(tourist.status)}>
                        {tourist.status === 'safe' ? 'SAFE' :
                         tourist.status === 'warning' ? 'SENSITIVE ZONE' :
                         'SOS ALERT'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tourist.lastSeen}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onSelectTourist(tourist)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredTourists.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tourists found matching your search criteria
              </div>
            )}

            {/* Summary Footer */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-muted-foreground">
                Showing {filteredTourists.length} of {tourists.length} tourists currently in Northeast India
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tourist Activities</CardTitle>
            <CardDescription>
              Latest check-ins and location updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Check-in Confirmed</div>
                  <div className="text-sm text-muted-foreground">
                    Priya Sharma checked in at Kamakhya Temple, Guwahati - 5 minutes ago
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Location Update</div>
                  <div className="text-sm text-muted-foreground">
                    Sarah Johnson moved from Gangtok to Tsomgo Lake - 12 minutes ago
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Entered Sensitive Zone</div>
                  <div className="text-sm text-muted-foreground">
                    Liu Wei entered restricted area near Shillong Peak - 25 minutes ago
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="text-sm font-medium">SOS Alert Triggered</div>
                  <div className="text-sm text-muted-foreground">
                    James Miller activated emergency alert at Kaziranga - 30 minutes ago
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