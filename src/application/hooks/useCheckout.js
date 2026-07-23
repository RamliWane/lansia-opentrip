"use client";

import { useState, useCallback } from "react";
import { Destination } from "../../domain/entities/Destination";
import {
  CustomerInfo,
  Participant,
  PaymentMethodType,
  OrderDomain,
  MEETING_POINTS,
  AVAILABLE_VOUCHERS,
  Voucher,
} from "../../domain/entities/Order";

export type CheckoutStep = "details" | "payment" | "confirmation";

export 

const initialCustomer= {
  fullName: "",
  email: "",
  phone: "",
  specialRequest: "",
};

const SERVICE_FEE = 15000;

export function useCheckout(initialDestination?) {
  const [state, setState] = useState<CheckoutState>({
    step: "details",
    destination: initialDestination ?? null,
    pax: 1,
    travelDate: "",
    customer: { ...initialCustomer },
    participants: [],
    meetingPointId: "main_office",
    voucherCode: "",
    appliedVoucher: null,
    voucherError: "",
    paymentMethod: null,
    orderId: "",
    totalAmount: 0,
    isLoading: false,
    error: null,
    agreeToTerms: false,
  });

  // ─── Destination & Basic ────────────────────────────────
  const setDestination = useCallback((dest) => {
    setState((prev) => ({ ...prev, destination: dest }));
  }, []);

  const setPax = useCallback((pax) => {
    setState((prev) => ({ ...prev, pax }));
  }, []);

  const setTravelDate = useCallback((date) => {
    setState((prev) => ({ ...prev, travelDate: date }));
  }, []);

  const setCustomer = useCallback((field: keyof CustomerInfo, value) => {
    setState((prev) => ({
      ...prev,
      customer: { ...prev.customer, [field]: value },
    }));
  }, []);

  const autofillProfile = useCallback(() => {
    setState((prev) => ({
      ...prev,
      customer: {
        fullName: "Budi Santoso",
        email: "budi.santoso@email.com",
        phone: "081234567890",
        specialRequest: prev.customer.specialRequest,
      },
    }));
  }, []);

  // ─── Participants ────────────────────────────────────────
  const addParticipant = useCallback(() => {
    const newP= {
      id: OrderDomain.generateParticipantId(),
      fullName: "",
      birthDate: "",
      gender: "",
      phone: "",
      email: "",
      relationship: "",
    };
    setState((prev) => ({
      ...prev,
      participants: [...prev.participants, newP],
    }));
  }, []);

  const updateParticipant = useCallback(
    (id, field: keyof Participant, value) => {
      setState((prev) => ({
        ...prev,
        participants: prev.participants.map((p) =>
          p.id === id ? { ...p, [field]: value } : p
        ),
      }));
    },
    []
  );

  const removeParticipant = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      participants: prev.participants.filter((p) => p.id !== id),
    }));
  }, []);

  // ─── Meeting Point ───────────────────────────────────────
  const setMeetingPointId = useCallback((id) => {
    setState((prev) => ({ ...prev, meetingPointId: id }));
  }, []);

  // ─── Voucher ─────────────────────────────────────────────
  const setVoucherCode = useCallback((code) => {
    setState((prev) => ({ ...prev, voucherCode: code, voucherError: "" }));
  }, []);

  const applyVoucher = useCallback(() => {
    setState((prev) => {
      const code = prev.voucherCode.trim().toUpperCase();
      const found = AVAILABLE_VOUCHERS.find((v) => v.code === code);
      const subtotal = (prev.destination?.priceMin ?? 0) * prev.pax;
      if (!found) {
        return { ...prev, voucherError: "Kode voucher tidak valid.", appliedVoucher: null };
      }
      if (subtotal < found.minOrder) {
        return {
          ...prev,
          voucherError: `Minimal order ${OrderDomain.formatPrice(found.minOrder)} untuk voucher ini.`,
          appliedVoucher: null,
        };
      }
      return { ...prev, appliedVoucher: found, voucherError: "" };
    });
  }, []);

  const removeVoucher = useCallback(() => {
    setState((prev) => ({ ...prev, appliedVoucher: null, voucherCode: "" }));
  }, []);

  // ─── Payment Method ──────────────────────────────────────
  const setPaymentMethod = useCallback((method) => {
    setState((prev) => ({ ...prev, paymentMethod: method }));
  }, []);

  const setAgreeToTerms = useCallback((value) => {
    setState((prev) => ({ ...prev, agreeToTerms: value }));
  }, []);

  // ─── Price Calculations ──────────────────────────────────
  const getTicketSubtotal = useCallback((s) => {
    return (s.destination?.priceMin ?? 0) * s.pax;
  }, []);

  const getMeetingPointFee = useCallback((s) => {
    const mp = MEETING_POINTS.find((m) => m.id === s.meetingPointId);
    return mp?.additionalCost ?? 0;
  }, []);

  const getDiscount = useCallback((s) => {
    if (!s.appliedVoucher) return 0;
    const subtotal = getTicketSubtotal(s);
    if (s.appliedVoucher.type === "percentage") {
      return Math.round(subtotal * ((s.appliedVoucher.percentageValue ?? 0) / 100));
    }
    return s.appliedVoucher.discount;
  }, [getTicketSubtotal]);

  const getTotal = useCallback((s) => {
    const sub = getTicketSubtotal(s);
    const mpFee = getMeetingPointFee(s);
    const disc = getDiscount(s);
    return Math.max(0, sub + mpFee + SERVICE_FEE - disc);
  }, [getTicketSubtotal, getMeetingPointFee, getDiscount]);

  // ─── Navigation ──────────────────────────────────────────
  const goToPayment = useCallback(() => {
    setState((prev) => {
      if (!prev.destination || !prev.travelDate) return prev;
      const orderId = OrderDomain.generateOrderId();
      const total = getTotal(prev);
      return { ...prev, step: "payment", orderId, totalAmount: total };
    });
  }, [getTotal]);

  const initiatePayment = useCallback(async () => {
    setState((prev) => {
      if (!prev.destination) return prev;
      return { ...prev, isLoading: true, error: null };
    });

    setState((prev) => {
      const currentState = prev;

      (async () => {
        try {
          const response = await fetch("/api/payment/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: currentState.orderId,
              amount: currentState.totalAmount,
              destination: currentState.destination,
              customer: currentState.customer,
              pax: currentState.pax,
              travelDate: currentState.travelDate,
            }),
          });

          if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Gagal membuat transaksi");
          }

          const data = await response.json();

          if (typeof window !== "undefined" && (window as any).snap) {
            (window as any).snap.pay(data.token, {
              onSuccess: () => {
                setState((p) => ({ ...p, step: "confirmation", isLoading: false }));
              },
              onPending: () => {
                setState((p) => ({ ...p, step: "confirmation", isLoading: false }));
              },
              onError: () => {
                setState((p) => ({
                  ...p,
                  isLoading: false,
                  error: "Pembayaran gagal. Silakan coba lagi.",
                }));
              },
              onClose: () => {
                setState((p) => ({ ...p, isLoading: false }));
              },
            });
          } else {
            if (data.redirectUrl) {
              window.location.href = data.redirectUrl;
            } else {
              setState((p) => ({ ...p, step: "confirmation", isLoading: false }));
            }
          }
        } catch (err) {
          setState((p) => ({
            ...p,
            isLoading: false,
            error: err instanceof Error ? err.message : "Terjadi kesalahan",
          }));
        }
      })();

      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      step: "details",
      destination: null,
      pax: 1,
      travelDate: "",
      customer: { ...initialCustomer },
      participants: [],
      meetingPointId: "main_office",
      voucherCode: "",
      appliedVoucher: null,
      voucherError: "",
      paymentMethod: null,
      orderId: "",
      totalAmount: 0,
      isLoading: false,
      error: null,
      agreeToTerms: false,
    });
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: "details",
      error: null,
    }));
  }, []);

  const ticketSubtotal = getTicketSubtotal(state);
  const meetingPointFee = getMeetingPointFee(state);
  const discount = getDiscount(state);
  const total = getTotal(state);

  return {
    ...state,
    serviceFee,
    ticketSubtotal,
    meetingPointFee,
    discount,
    total,
    setDestination,
    setPax,
    setTravelDate,
    setCustomer,
    autofillProfile,
    addParticipant,
    updateParticipant,
    removeParticipant,
    setMeetingPointId,
    setVoucherCode,
    applyVoucher,
    removeVoucher,
    setPaymentMethod,
    setAgreeToTerms,
    goToPayment,
    initiatePayment,
    reset,
    goBack,
  };
}
