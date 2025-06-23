import React, { useState } from 'react';
import { Users, Plus, Mail, Shield, Crown, UserCheck, UserX, Settings } from 'lucide-react';
import { useDataStore } from '../../stores/dataStore';
import { TeamMember, TeamInvite } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';

export const TeamManagement: React.FC = () => {
  const { teamMembers, teamInvites, addTeamMember, removeTeamMember, updateMemberRole, addTeamInvite, removeTeamInvite } = useDataStore();
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'viewer' | 'editor' | 'admin'>('viewer');

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }

    const invite: TeamInvite = {
      id: Date.now().toString(),
      email: inviteEmail,
      role: inviteRole,
      invitedBy: 'current-user',
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    addTeamInvite(invite);
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setShowInviteForm(false);
  };

  const handleAcceptInvite = (invite: TeamInvite) => {
    const member: TeamMember = {
      id: Date.now().toString(),
      name: invite.email.split('@')[0],
      email: invite.email,
      role: invite.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${invite.email}`,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      status: 'active'
    };

    addTeamMember(member);
    removeTeamInvite(invite.id);
    toast.success(`${invite.email} joined the team!`);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'editor': return UserCheck;
      case 'viewer': return Users;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-700';
      case 'editor': return 'bg-blue-100 text-blue-700';
      case 'viewer': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Team Management</h2>
            <p className="text-gray-600">Manage team members and permissions</p>
          </div>
        </div>
        
        <Button onClick={() => setShowInviteForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite Team Member</h3>
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as any)}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="viewer">Viewer - Can view dashboards</option>
                <option value="editor">Editor - Can create and edit</option>
                <option value="admin">Admin - Full access</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={handleInvite} className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
              <Button variant="outline" onClick={() => setShowInviteForm(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Pending Invites */}
      {teamInvites.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Invitations</h3>
          <div className="space-y-3">
            {teamInvites.map((invite) => (
              <div key={invite.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">{invite.email}</p>
                    <p className="text-sm text-gray-600">Invited as {invite.role}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => handleAcceptInvite(invite)}>
                    Accept (Demo)
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => removeTeamInvite(invite.id)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Team Members */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
        {teamMembers.length > 0 ? (
          <div className="space-y-4">
            {teamMembers.map((member) => {
              const RoleIcon = getRoleIcon(member.role);
              return (
                <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-xs text-gray-500">
                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(member.role)}`}>
                      <RoleIcon className="h-4 w-4 mr-1" />
                      {member.role}
                    </div>
                    
                    <div className={`w-3 h-3 rounded-full ${
                      member.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                    }`} title={member.status} />
                    
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeTeamMember(member.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No team members yet</h3>
            <p className="text-gray-600 mb-6">Invite colleagues to collaborate on dashboards</p>
            <Button onClick={() => setShowInviteForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Invite First Member
            </Button>
          </div>
        )}
      </Card>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Invites</p>
              <p className="text-2xl font-bold text-gray-900">{teamInvites.length}</p>
            </div>
            <Mail className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => m.status === 'active').length}
              </p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>
    </div>
  );
};