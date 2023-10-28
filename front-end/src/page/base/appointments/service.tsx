import { FormWrapperAppoinment } from "./FormWapperAppointment";
import { TServices } from "../../../schema/services";
import { useServicesQuery } from "../../../services/services";

type ServiceFormProps = {
  service: TServices;
  updateFields: (fields: Partial<ServiceFormProps>) => void;
};

export function ServiceForm({ service, updateFields }: ServiceFormProps) {
  const { data: servicesData } = useServicesQuery(); // Sử dụng một biến khác để lưu trữ kết quả từ useServicesQuery

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      alert("Vui lòng chọn một loại dịch vụ");
    } else {
      const selectedService = servicesData?.find(
        (s) => s.id === Number(selectedOption)
      );
      if (selectedService) {
        updateFields({
          service: {
            id: selectedService.id,
            name_service: selectedService.name_service,
          },
        });
      }
    }
  };

  return (
    <FormWrapperAppoinment title="Bạn muốn chọn dịch vụ nào?">
      <label>Dịch vụ: </label>
      <select required onChange={handleSelectChange} value={service.id}>
        <option value="">Lựa chọn</option>
        {servicesData?.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name_service}
          </option>
        ))}
      </select>
    </FormWrapperAppoinment>
  );
}
