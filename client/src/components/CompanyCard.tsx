// components/CompanyCard.tsx (обновленная версия)
import React, { useState } from 'react';
import { Company, Vehicle, Tariff } from '../api/companies';
import { VehicleForm } from './VehicleForm';
import { TariffForm } from './TariffForm';
import { CompanyForm } from './CompanyForm';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { companiesAPI } from '../api/companies';

interface CompanyCardProps {
  company: Company;
  enumData: any;
  onUpdate: () => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, enumData, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showTariffForm, setShowTariffForm] = useState(false);
  const [showEditCompany, setShowEditCompany] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteCompany = async () => {
    setDeleteLoading(true);
    try {
      await companiesAPI.deleteCompany(company.id);
      onUpdate();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Ошибка удаления компании:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getAreaLabel = (area: string) => {
    const areaMap: { [key: string]: string } = {
      STAVROPOLSKIY_KRAY: 'Ставропольский край',
      ROSTOVSKAYA_OBLAST: 'Ростовская область',
      KRASNODARSKIY_KRAY: 'Краснодарский край'
    };
    return areaMap[area] || area;
  };

  return (
    <>
      <div className="card hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">{company.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{company.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <span>📍 {getAreaLabel(company.area)}</span>
            </div>
            <div className="text-sm text-gray-500 mb-1">📞 {company.phone}</div>
            <div className="text-sm text-gray-500 mb-1">📧 {company.email}</div>
            {company.website && (
              <div className="text-sm text-gray-500 mb-1">🌐 {company.website}</div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowEditCompany(true)}
              className="btn-secondary text-sm px-3 py-1"
              title="Редактировать"
            >
              ✏️
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="btn-danger text-sm px-3 py-1"
              title="Удалить"
            >
              🗑️
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="btn-secondary text-sm px-3 py-1"
              title={expanded ? 'Свернуть' : 'Развернуть'}
            >
              {expanded ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="space-y-4">
            {/* Vehicles Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-medium text-white">Транспортные средства</h4>
                <button
                  onClick={() => setShowVehicleForm(true)}
                  className="btn-primary text-sm px-3 py-1"
                >
                  + Добавить
                </button>
              </div>
              {company.vehicles.length > 0 ? (
                <div className="grid gap-2">
                  {company.vehicles.map((vehicle) => (
                    <VehicleItem key={vehicle.id} vehicle={vehicle} onUpdate={onUpdate} enumData={enumData} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Нет транспортных средств</p>
              )}
            </div>

            {/* Tariffs Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-medium text-white">Тарифы</h4>
                <button
                  onClick={() => setShowTariffForm(true)}
                  className="btn-primary text-sm px-3 py-1"
                >
                  + Добавить
                </button>
              </div>
              {company.tariffs.length > 0 ? (
                <div className="grid gap-2">
                  {company.tariffs.map((tariff) => (
                    <TariffItem key={tariff.id} tariff={tariff} onUpdate={onUpdate} enumData={enumData} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Нет тарифов</p>
              )}
            </div>
          </div>
        )}
      </div>

      {showEditCompany && (
        <CompanyForm
          company={company}
          enumData={enumData}
          onClose={() => setShowEditCompany(false)}
          onSuccess={onUpdate}
        />
      )}

      {showVehicleForm && (
        <VehicleForm
          companyId={company.id}
          enumData={enumData}
          onClose={() => setShowVehicleForm(false)}
          onSuccess={onUpdate}
        />
      )}

      {showTariffForm && (
        <TariffForm
          companyId={company.id}
          enumData={enumData}
          onClose={() => setShowTariffForm(false)}
          onSuccess={onUpdate}
        />
      )}

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteCompany}
        title="Удаление компании"
        message="Вы уверены, что хотите удалить эту компанию? Это действие нельзя отменить."
        loading={deleteLoading}
      />
    </>
  );
};

const VehicleItem: React.FC<{ vehicle: Vehicle; onUpdate: () => void; enumData: any }> = ({ 
  vehicle, 
  onUpdate, 
  enumData 
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await companiesAPI.deleteVehicle(vehicle.id);
      onUpdate();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Ошибка удаления транспорта:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-700 rounded-lg p-3 flex justify-between items-center">
        <div className="flex-1">
          <div className="text-white font-medium">{vehicle.licensePlate}</div>
          <div className="text-gray-400 text-sm">{vehicle.model}</div>
          <div className="text-gray-500 text-xs">
            {vehicle.vehicleType} • {vehicle.capacity}т • {vehicle.volume}м³ • {vehicle.vehicleStatus}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowEdit(true)}
            className="btn-secondary text-sm px-2 py-1"
            title="Редактировать"
          >
            ✏️
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-danger text-sm px-2 py-1"
            title="Удалить"
          >
            🗑️
          </button>
        </div>
      </div>

      {showEdit && (
        <VehicleForm
          vehicle={vehicle}
          enumData={enumData}
          onClose={() => setShowEdit(false)}
          onSuccess={onUpdate}
        />
      )}

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Удаление транспорта"
        message="Вы уверены, что хотите удалить это транспортное средство?"
        loading={deleteLoading}
      />
    </>
  );
};

const TariffItem: React.FC<{ tariff: Tariff; onUpdate: () => void; enumData: any }> = ({ 
  tariff, 
  onUpdate, 
  enumData 
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await companiesAPI.deleteTariff(tariff.id);
      onUpdate();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Ошибка удаления тарифа:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-700 rounded-lg p-3 flex justify-between items-center">
        <div className="flex-1">
          <div className="text-white font-medium">{tariff.name}</div>
          <div className="text-gray-400 text-sm">
            {tariff.rate} {tariff.rateType}
          </div>
          <div className="text-gray-500 text-xs">
            Мин. цена: {tariff.minPrice} руб.
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowEdit(true)}
            className="btn-secondary text-sm px-2 py-1"
            title="Редактировать"
          >
            ✏️
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-danger text-sm px-2 py-1"
            title="Удалить"
          >
            🗑️
          </button>
        </div>
      </div>

      {showEdit && (
        <TariffForm
          tariff={tariff}
          enumData={enumData}
          onClose={() => setShowEdit(false)}
          onSuccess={onUpdate}
        />
      )}

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Удаление тарифа"
        message="Вы уверены, что хотите удалить этот тариф?"
        loading={deleteLoading}
      />
    </>
  );
};