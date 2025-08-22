import React from "react";
import { useForm } from "react-hook-form";
import './Transaction.scss'
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSnackbar } from 'notistack';

// Schema validation
const schema = Yup.object().shape({
  time: Yup.string().required("Vui lòng chọn thời gian"),
  amount: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Số lượng phải là số")
    .positive("Số lượng phải lớn hơn 0")
    .required("Vui lòng nhập số lượng"),
  pump: Yup.string().required("Vui lòng nhập trụ bơm"),
  price: Yup
    .number()
    .typeError("Đơn giá phải là số")
    .positive("Đơn giá phải lớn hơn 0")
    .required("Không được để trống"),
});

const TransactionForm = () => {
  const { enqueueSnackbar } = useSnackbar(); // hook notistack
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
    reset(); // reset form sau khi submit
  };

  return (
    <div className="transaction-container">
      <h3 className="transaction-title">Nhập Giao Dịch</h3>
      <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="transaction-field">
          <label className="transaction-label">Thời gian</label>
          <input
            type="datetime-local"
            className={`transaction-input ${errors.time ? "transaction-error" : ""}`}
            {...register("time")}
          />
          <div className="transaction-error-msg">{errors.time?.message}</div>
        </div>

        <div className="transaction-field">
          <label className="transaction-label">Số lượng (lít)</label>
          <input
            type="number"
            className={`transaction-input ${errors.amount ? "transaction-error" : ""}`}
            {...register("amount")}
          />
          <div className="transaction-error-msg">{errors.amount?.message}</div>
        </div>

        <div className="transaction-field">
          <label className="transaction-label">Trụ</label>
          <select
            className={`transaction-input ${errors.pump ? "transaction-error" : ""}`}
            {...register("pump")}
          >
            <option value="">-- Chọn trụ bơm --</option>
            <option value="Tru1">Trụ 1</option>
            <option value="Tru2">Trụ 2</option>
            <option value="Tru3">Trụ 3</option>
          </select>
          <div className="transaction-error-msg">{errors.pump?.message}</div>
        </div>
        <div className="transaction-field">
          <label className="transaction-label">Đơn giá</label>
          <input
            type="number"
            className={`transaction-input ${errors.price ? "transaction-error" : ""}`}
            {...register("price")}
          />
          <div className="transaction-error-msg">{errors.price?.message}</div>
        </div>
        <div className="transaction-field">
          <label className="transaction-label">Doanh thu</label>
          <input
            type="number"
            className="transaction-input"
            value={watch("amount") * watch("price") || ""}
            readOnly
          />
        </div>

        <button type="submit" className="transaction-submit-btn">
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
