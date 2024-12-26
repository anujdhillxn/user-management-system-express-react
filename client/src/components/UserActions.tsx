import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Colors from '../styles/colors';
import { Action, ActionCreateOtherType, ActionDeleteOtherType, ActionLoginType, ActionLogoutType, ActionType, ActionUpdateOtherType, ActionUpdateSelfType, User } from '../types/context';

interface UserActionsProps {
    user: User;
}

const UserActions: React.FC<UserActionsProps> = (props: UserActionsProps) => {
    const { user: contextUser } = useAppContext();
    const isMe = contextUser?.username === props.user.username;
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = React.useState(today);
    const [endDate, setEndDate] = React.useState(today);
    const [selectedActionTypes, setSelectedActionTypes] = React.useState<ActionType[]>([ActionType.LOGIN]);
    const [filteredActions, setFilteredActions] = React.useState<Action[]>(props.user.actions || []);

    React.useEffect(() => {
        const filtered = props.user.actions.filter(action => {
            const actionDate = new Date(action.actionDate).toISOString().split('T')[0];
            const isDateInRange = actionDate >= startDate && actionDate <= endDate;
            const isActionTypeSelected = selectedActionTypes.length === 0 || selectedActionTypes.includes(action.actionType);
            return isDateInRange && isActionTypeSelected;
        });
        setFilteredActions(filtered);
    }, [startDate, endDate, selectedActionTypes, props.user.actions]);

    const handleActionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = e.target.options;
        const selectedTypes: ActionType[] = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedTypes.push(options[i].value as ActionType);
            }
        }
        setSelectedActionTypes(selectedTypes);
    };

    const handleDownloadJson = () => {
        const dataStr = JSON.stringify(filteredActions, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${props.user.username}_actions.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-1/2 p-4" style={{ backgroundColor: Colors.Background2 }}>
            <h2 className="text-xl mb-4" style={{ color: Colors.Text1 }}>{!isMe ? props.user.username + "'s" : "My"} Actions</h2>
            <div className="mb-4">
                <label htmlFor="start-date" className="block mb-2" style={{ color: Colors.Text2 }}>Start Date</label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border rounded"
                    style={{ borderColor: Colors.Text3, backgroundColor: Colors.Background2, color: Colors.Text1 }}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="end-date" className="block mb-2" style={{ color: Colors.Text2 }}>End Date</label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border rounded"
                    style={{ borderColor: Colors.Text3, backgroundColor: Colors.Background2, color: Colors.Text1 }}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="action-types" className="block mb-2" style={{ color: Colors.Text2 }}>Action Types</label>
                <select
                    id="action-types"
                    multiple
                    value={selectedActionTypes}
                    onChange={handleActionTypeChange}
                    className="w-full p-2 border rounded"
                    style={{ borderColor: Colors.Text3, backgroundColor: Colors.Background2, color: Colors.Text1 }}
                >
                    {Object.values(ActionType).map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleDownloadJson}
                className="p-2 mb-4 bg-blue-500 text-white rounded"
                style={{ backgroundColor: Colors.Primary1 }}
            >
                Download JSON
            </button>
            <ul className="list-disc pl-5" style={{ color: Colors.Text1 }}>
                {filteredActions.map((action: any) => (
                    <li key={action._id}>{`${action.actionDate}: ${getActionText(action)}`}</li>
                ))}
            </ul>
        </div>
    );
};

const getActionText = (action: Action) => {
    switch (action.actionType) {
        case ActionType.LOGIN:
            const detailsLogin = action.actionDetails as ActionLoginType;
            return `Logged in from ${detailsLogin.ipAddress} using ${detailsLogin.device}`;
        case ActionType.LOGOUT:
            const detailsLogout = action.actionDetails as ActionLogoutType;
            return `Logged out from ${detailsLogout.ipAddress} using ${detailsLogout.device}`;
        case ActionType.CREATE_OTHERS:
            const detailsCreate = action.actionDetails as ActionCreateOtherType;
            return `Created user with id ${detailsCreate.createdUserId}`;
        case ActionType.UPDATE_OTHERS:
            const detailsUpdate = action.actionDetails as ActionUpdateOtherType;
            return `Updated user with id ${detailsUpdate.updatedUserId} with fields ${JSON.stringify(detailsUpdate.updatedFields)}`;
        case ActionType.DELETE_OTHERS:
            const detailsDelete = action.actionDetails as ActionDeleteOtherType;
            return `Deleted user with id ${detailsDelete.deletedUserId}`;
        case ActionType.UPDATE_SELF:
            const detailsUpdateSelf = action.actionDetails as ActionUpdateSelfType;
            return `Updated profile with fields ${JSON.stringify(detailsUpdateSelf.updatedFields)}`;
        case ActionType.DELETE_SELF:
            return 'Deleted profile';
        case ActionType.CREATE_SELF:
            return 'Created profile';
        default:
            return '';
    }
}

export default UserActions;