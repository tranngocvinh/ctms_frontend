import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

interface ContainerSize {
    length: number;
    width: number;
    height: number;
    volume: number;
    weight: number;
    loadCapacity: number;
    maxLoad: number;
    containerType: {
        name: string;
    };
}

interface Detail {
    containerCode: string;
    containerSize?: ContainerSize;
}

interface EmptyContainerDetailModalProps {
    visible: boolean;
    onHide: () => void;
    emptyContainer: {
        requestTime: string;
        portLocation: {
            portName: string;
            lat: number;
            lon: number;
        };
        ship: {
            name: string;
            company: string;
        };
        details: Detail[];
    } | null; // Allow null for initial state
}

const EmptyContainerDetailModal: React.FC<EmptyContainerDetailModalProps> = ({ visible, onHide, emptyContainer }) => {
    const [detailsWithSizes, setDetailsWithSizes] = useState<Detail[]>([]);

    useEffect(() => {
        if (emptyContainer && emptyContainer.details.length > 0) {
            const fetchContainerSizes = async () => {
                const updatedDetails = await Promise.all(
                    emptyContainer.details.map(async (detail) => {
                        const response = await fetch(`https://auth.g42.biz/api/containers/${detail.containerCode}`);
                        const data = await response.json();
                        return { ...detail, containerSize: data.containerSize };
                    })
                );
                setDetailsWithSizes(updatedDetails);
            };
            fetchContainerSizes();
        }
    }, [emptyContainer]);

    return (
        <Dialog header="Thông tin chi tiết" visible={visible} style={{ width: '50vw' }} onHide={onHide} modal>
            {emptyContainer && (
                <div className="p-fluid">
                    <div className="p-field">
                        <p>Thời gian tạo lệnh:
                            <span>{new Date(emptyContainer.requestTime).toLocaleString()}</span>
                        </p>
                    </div>
                    <div className="p-field">
                        <p>Cảng:
                            <span>{`${emptyContainer.portLocation.portName} (${emptyContainer.portLocation.lat}, ${emptyContainer.portLocation.lon})`}</span>
                        </p>
                    </div>
                    <div className="p-field">
                        <p>Tàu:
                            <span>{`${emptyContainer.ship.name} (${emptyContainer.ship.company})`}</span>
                        </p>
                    </div>

                    <div className="p-field">
                        <label>Thông tin chi tiết:</label>
                        <ul>
                            {detailsWithSizes.map((detail, index) => (
                                <li key={index}>
                                    {detail.containerSize ? (
                                        <>
                                            <div>Loại container: {detail.containerSize.containerType.name}</div>
                                            <div>Kích thước container: {detail.containerSize.length}m x {detail.containerSize.width}m x {detail.containerSize.height}m</div>
                                            <div>Thể tích: {detail.containerSize.volume} m³</div>
                                            <div>Cân nặng: {detail.containerSize.weight} kg</div>
                                            <div>Tải trọng: {detail.containerSize.loadCapacity} kg</div>
                                            <div>Tải trọng tối đa: {detail.containerSize.maxLoad} kg</div>
                                        </>
                                    ) : (
                                        <div>Đang tải thông tin kích thước container...</div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <Button label="Close" onClick={onHide} />
        </Dialog>
    );
};

export default EmptyContainerDetailModal;
