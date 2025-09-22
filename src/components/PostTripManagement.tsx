import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { 
  ArrowLeft, 
  Archive, 
  Search, 
  Filter, 
  Download,
  Shield,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Eye
} from 'lucide-react';
import { useState } from 'react';

interface PostTripManagementProps {
  onBack: () => void;
}

interface CompletedTrip {
  id: string;
  name: string;
  tripId: string;
  nationality: string;
  startDate: string;
  endDate: string;
  duration: string;
  status: 'archived' | 'processing' | 'completed';
  incidents: number;
  didRevoked: boolean;
}

export function PostTripManagement({ onBack }: PostTripManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<CompletedTrip | null>(null);

  const completedTrips: CompletedTrip[] = [
    {
      id: '1',
      name: 'John Smith',
      tripId: 'TRIP-00098',
      nationality: 'USA',
      startDate: '2025-01-01',
      endDate: '2025-01-10',
      duration: '10 days',
      status: 'archived',
      incidents: 0,
      didRevoked: true
    },
    {
      id: '2',
      name: 'Emma Wilson',
      tripId: 'TRIP-00099',
      nationality: 'UK',
      startDate: '2025-01-03',
      endDate: '2025-01-12',
      duration: '9 days',
      status: 'archived',
      incidents: 1,
      didRevoked: true
    },
    {
      id: '3',
      name: 'Carlos Rodriguez',
      tripId: 'TRIP-00100',
      nationality: 'Spain',
      startDate: '2025-01-05',
      endDate: '2025-01-14',
      duration: '9 days',
      status: 'processing',
      incidents: 0,
      didRevoked: false
    },
    {
      id: '4',
      name: 'Yuki Tanaka',
      tripId: 'TRIP-00101',
      nationality: 'Japan',
      startDate: '2025-01-07',
      endDate: '2025-01-15',
      duration: '8 days',
      status: 'completed',
      incidents: 2,
      didRevoked: false
    },
    {
      id: '5',
      name: 'Anna Kowalski',
      tripId: 'TRIP-00102',
      nationality: 'Poland',
      startDate: '2025-01-08',
      endDate: '2025-01-16',
      duration: '8 days',
      status: 'archived',
      incidents: 0,
      didRevoked: true
    },
    {
      id: '6',
      name: 'Mohammed Al-Hassan',
      tripId: 'TRIP-00103',
      nationality: 'UAE',
      startDate: '2025-01-10',
      endDate: '2025-01-18',
      duration: '8 days',
      status: 'processing',
      incidents: 1,
      didRevoked: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCountryFlag = (nationality: string) => {
    const flags: { [key: string]: string } = {
      'USA': '🇺🇸',
      'UK': '🇬🇧',
      'Spain': '🇪🇸',
      'Japan': '🇯🇵',
      'Poland': '🇵🇱',
      'UAE': '🇦🇪',
      'Germany': '🇩🇪',
      'France': '🇫🇷'
    };
    return flags[nationality] || '🏳️';
  };

  const filteredTrips = completedTrips.filter(trip =>
    trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.tripId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalCompleted: completedTrips.length,
    archived: completedTrips.filter(t => t.status === 'archived').length,
    processing: completedTrips.filter(t => t.status === 'processing').length,
    withIncidents: completedTrips.filter(t => t.incidents > 0).length
  };

  if (selectedTrip) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedTrip(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to List
            </Button>
            <h1 className="text-2xl font-semibold">Trip Archive Details</h1>
          </div>
          <Badge className={getStatusColor(selectedTrip.status)}>
            {selectedTrip.status.toUpperCase()}
          </Badge>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trip Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Trip Summary</CardTitle>
                <CardDescription>Complete journey overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Tourist Name</span>
                    <div className="font-medium">{selectedTrip.name}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Trip ID</span>
                    <div className="font-medium">{selectedTrip.tripId}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Nationality</span>
                    <div className="font-medium flex items-center gap-2">
                      {getCountryFlag(selectedTrip.nationality)} {selectedTrip.nationality}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <div className="font-medium">{selectedTrip.duration}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Start Date</span>
                    <div className="font-medium">{selectedTrip.startDate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">End Date</span>
                    <div className="font-medium">{selectedTrip.endDate}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Incidents</span>
                    <div className="font-medium">{selectedTrip.incidents}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">DID Status</span>
                    <div className="font-medium">
                      {selectedTrip.didRevoked ? (
                        <Badge variant="secondary">Revoked</Badge>
                      ) : (
                        <Badge variant="outline">Active</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Blockchain Security
                </CardTitle>
                <CardDescription>
                  Data secured via distributed ledger technology
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Data Integrity Verified</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    All trip data has been cryptographically secured and cannot be tampered with.
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Block Hash:</span>
                    <span className="font-mono text-xs">0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7a</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transaction ID:</span>
                    <span className="font-mono text-xs">tx_9f8e7d6c5b4a3f2e1d0c9b8a</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Timestamp:</span>
                    <span>{selectedTrip.endDate} 14:32:15 UTC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Confirmations:</span>
                    <span className="text-green-600 font-medium">247</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <div className="text-sm font-medium mb-1">Note:</div>
                  <div className="text-sm text-muted-foreground">
                    Data available only for audit purposes. Access is logged and monitored for compliance.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trip Timeline */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Trip Timeline & Activities</CardTitle>
              <CardDescription>
                Chronological record of all trip activities and checkpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Trip Started</div>
                    <div className="text-sm text-muted-foreground">{selectedTrip.startDate} 08:00 - Arrival at JFK Airport</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Hotel Check-in</div>
                    <div className="text-sm text-muted-foreground">{selectedTrip.startDate} 15:30 - Manhattan Hotel</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Tourist Activity</div>
                    <div className="text-sm text-muted-foreground">Multiple days - Central Park, Times Square, Brooklyn Bridge visits</div>
                  </div>
                </div>
                {selectedTrip.incidents > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mt-1" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Incident Reported</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedTrip.incidents} incident(s) during trip - All resolved successfully
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Trip Completed</div>
                    <div className="text-sm text-muted-foreground">{selectedTrip.endDate} 18:45 - Departure from JFK Airport</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mt-1" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Data Archived</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedTrip.didRevoked ? 'DID revoked and data secured on blockchain' : 'Processing for archival'}
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
            <Archive className="w-8 h-8 text-purple-600" />
            Post-Trip Management
          </h1>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700">
          {stats.totalCompleted} Completed Tours
        </Badge>
      </div>

      <div className="p-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-gray-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-gray-600">{stats.archived}</div>
                  <div className="text-sm text-muted-foreground">Archived</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-orange-600">{stats.processing}</div>
                  <div className="text-sm text-muted-foreground">Processing</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-blue-600">{stats.totalCompleted}</div>
                  <div className="text-sm text-muted-foreground">Total Tours</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-green-600">
                    {Math.round((stats.totalCompleted - stats.withIncidents) / stats.totalCompleted * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Safe Tours</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Completed Tours Archive</CardTitle>
                <CardDescription>
                  Historical record of all completed tourist journeys
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, trip ID, or nationality..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tourist</TableHead>
                  <TableHead>Trip ID</TableHead>
                  <TableHead>Nationality</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Incidents</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>DID Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="font-medium">{trip.name}</TableCell>
                    <TableCell>{trip.tripId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCountryFlag(trip.nationality)} {trip.nationality}
                      </div>
                    </TableCell>
                    <TableCell>{trip.duration}</TableCell>
                    <TableCell>
                      {trip.incidents > 0 ? (
                        <Badge variant="destructive" className="text-xs">
                          {trip.incidents}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          0
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(trip.status)}>
                        {trip.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {trip.didRevoked ? (
                        <Badge variant="secondary" className="text-xs">
                          Revoked
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedTrip(trip)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Blockchain Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 mb-1">Blockchain Security Notice</div>
                  <div className="text-sm text-blue-700">
                    All archived data is secured via blockchain technology and cannot be modified. 
                    Access is logged and monitored for compliance with data protection regulations. 
                    Data is available only for audit purposes and authorized security investigations.
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