import React, {useEffect, useState} from 'react';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {InputNumber} from 'primereact/inputnumber';
import {allocateContainersToPort, allocateContainersToShip} from 'app/api/container';
import axios from 'axios';

const AllocateEmptyContainers = () => {
    const [numberOfContainers, setNumberOfContainers] = useState(1);
    const [ships, setShips] = useState([]);
    const [ports, setPorts] = useState([]);
    const [selectedShip, setSelectedShip] = useState(null);
    const [selectedPort, setSelectedPort] = useState(null);
    const [mode, setMode] = useState('ship'); // 'ship' or 'port'

    useEffect(() => {
        fetchShips();
        fetchPorts();
    }, []);

    const fetchShips = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/ships`);
            setShips(response.data.map(ship => ({ label: ship.name, value: ship.id })));
        } catch (error) {
            console.error('Error fetching ships:', error);
        }
    };

    const fetchPorts = async () => {
        try {
            const response = await axios.get(`https://auth.g42.biz/api/ports`);
            setPorts(response.data.map(port => ({ label: port.portName, value: port.portName })));
        } catch (error) {
            console.error('Error fetching ports:', error);
        }
    };

    const handleAllocate = async () => {
        try {
            if (mode === 'ship') {
                await allocateContainersToShip(numberOfContainers, selectedShip);
                alert('Containers allocated successfully to ship');
            } else {
                await allocateContainersToPort(numberOfContainers, selectedPort);
                alert('Containers allocated successfully to port');
            }
        } catch (error) {
            alert('Error allocating containers:', error);
        }
    };

    return (
        <div className="p-fluid">
            <h3>Allocate Empty Containers</h3>
            <div className="p-field">
                <label>Number of Containers</label>
                <InputNumber value={numberOfContainers} onValueChange={(e) => setNumberOfContainers(e.value)} min={1} />
            </div>
            <div className="p-field">
                <label>Allocate To</label>
                <Dropdown value={mode} options={[
                    { label: 'Ship', value: 'ship' },
                    { label: 'Port', value: 'port' }
                ]} onChange={(e) => setMode(e.value)} />
            </div>
            {mode === 'ship' && (
                <div className="p-field">
                    <label>Ship</label>
                    <Dropdown value={selectedShip} options={ships} onChange={(e) => setSelectedShip(e.value)} placeholder="Select a Ship" />
                </div>
            )}
            {mode === 'port' && (
                <div className="p-field">
                    <label>Port</label>
                    <Dropdown value={selectedPort} options={ports} onChange={(e) => setSelectedPort(e.value)} placeholder="Select a Port" />
                </div>
            )}
            <div className="p-field">
                <Button label="Allocate" onClick={handleAllocate} />
            </div>
        </div>
    );
};

export default AllocateEmptyContainers;
