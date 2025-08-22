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
  total: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Tổng tiền phải là số")
    .positive("Tổng tiền phải lớn hơn 0")
    .required("Vui lòng nhập tổng tiền"),
});

const TransactionForm = () => {
  const { enqueueSnackbar } = useSnackbar(); // hook notistack
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Giao dịch hợp lệ:", data);
    enqueueSnackbar('Giao dịch thành công!', { variant: 'success' });
    reset(); // reset form sau khi submit
  };

  return (
    <div className="transaction-container">
      <h3 className="transaction-title">Form Giao Dịch</h3>
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
          <label className="transaction-label">Trụ bơm</label>
          <input
            type="text"
            className={`transaction-input ${errors.pump ? "transaction-error" : ""}`}
            {...register("pump")}
          />
          <div className="transaction-error-msg">{errors.pump?.message}</div>
        </div>

        <div className="transaction-field">
          <label className="transaction-label">Tổng tiền</label>
          <input
            type="number"
            className={`transaction-input ${errors.total ? "transaction-error" : ""}`}
            {...register("total")}
          />
          <div className="transaction-error-msg">{errors.total?.message}</div>
        </div>

        <button type="submit" className="transaction-submit-btn">
          Gửi giao dịch
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
