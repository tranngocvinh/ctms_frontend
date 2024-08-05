import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface EmptyContainerDetailModalProps {
    visible: boolean;
    onHide: () => void;
    emptyContainer: any; // You should define the correct type here
}

const EmptyContainerDetailModal: React.FC<EmptyContainerDetailModalProps> = ({ visible, onHide, emptyContainer }) => {
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
                            {emptyContainer.details.map((detail: any, index: number) => (
                                <li key={index}>
                                    <div>Loại container: {detail.containerSize.containerType.name}</div>
                                    <div>Số lượng: {detail.quantity}</div>
                                    <div>Kích thước container: {detail.containerSize.length}m x {detail.containerSize.width}m x {detail.containerSize.height}m</div>
                                    <div>Thể tích: {detail.containerSize.volume} m³</div>
                                    <div>Cân nặng: {detail.containerSize.weight} kg</div>
                                    <div>Tải trọng: {detail.containerSize.loadCapacity} kg</div>
                                    <div>Tải trọng tối đa: {detail.containerSize.maxLoad} kg</div>
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
