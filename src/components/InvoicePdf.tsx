"use client";

import { Order } from "@/lib/definition";
import { formatDate } from "@/lib/formatDate";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const InvoicePdf = ({ order }: { order: Order }) => {
  const styles = StyleSheet.create({
    header: { fontSize: 18, fontWeight: "extrabold" },
    section: {
      marginBottom: 20,
      fontSize: 12,
    },
    title: {
      fontSize: 14,
      fontWeight: "extrabold",
      marginBottom: 10,
    },
  });

  const priceInfo: Record<string, number> = {
    Subtotal: order?.totalPrice,
    Shipping: 0,
    Vat: 0,
    Total: order?.totalPrice,
  };

  return (
    <Document>
      <Page size="A4" style={{ padding: "0.5in" }}>
        <View
          style={[
            {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            },
            styles.section,
          ]}
        >
          <Text style={styles.header}>Invoice </Text>
          <Text style={styles.header}>Luxeon</Text>
        </View>

        <Text style={styles.title}>{`Order_${order?._id}`}</Text>

        <View style={[{ marginBottom: "0.6in" }, styles.section]}>
          <Text style={{ marginBottom: 5 }}>{order?.user.name}</Text>
          <Text style={{ marginBottom: 5 }}>{order?.user.email}</Text>
          <Text>{`Adress: ${[
            order?.address?.addressLine,
            order?.address?.street,
            order?.address?.city &&
              ` ${order?.address?.city}(${order?.address?.zipCode})`,
            order?.address?.country,
          ]
            .filter(Boolean)
            .join(",")}`}</Text>
        </View>
        <View style={[{ marginBottom: "0.6in" }, styles.section]}>
          <Text style={styles.title}>Payment info</Text>
          <Text
            style={{ marginBottom: 5 }}
          >{`Transaction ID: ${order?.paymentDetails.transactionId}`}</Text>
          <Text>Purchase date: {formatDate(order?.createdAt as Date)}</Text>
        </View>

        <View style={[{ marginBottom: "0.6in" }, styles.section]}>
          <Text style={styles.title}>Items</Text>
          <View style={styles.section}>
            {order?.items.map((item) => (
              <View
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  marginBottom: 5,
                }}
              >
                <Text>{item?.product?.title}</Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    gap: 5,
                  }}
                >
                  <Text>{item?.quantity}x</Text>
                  <Text>{`$${Number(item.product.price) / 100}`}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View
          style={[
            {
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            },
            styles.section,
          ]}
        >
          {Object.keys(priceInfo).map((infoKey) => (
            <Text key={infoKey} style={{ marginBottom: 5 }}>
              {`${infoKey}: $${priceInfo[infoKey] / 100}`}{" "}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePdf;
