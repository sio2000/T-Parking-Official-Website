# Προτάσεις για νέες κάρτες στο Admin Panel

Μετά τις διορθώσεις, προτείνονται οι ακόλουθες νέες κάρτες για περαιτέρω βελτίωση του dashboard:

---

## Πλήρες Dashboard (Στατιστικά)

1. **Κουπόνια που εξαργυρώθηκαν** – Πλήθος από `coupon_redemptions`
2. **Προορισμοί που επιτεύχθηκαν** – Πλήθος από `destination_reached`
3. **Νοτιφικάτσιας που στάλθηκαν** – Πλήθος από `notifications`
4. **Μέσος χρόνος στάθμευσης** – Μέσος όρος `duration` από `parking_history`
5. **Θέσεις ανά μέγεθος (live)** – Μικρές / Μεσαίες / Μεγάλες από `parking_spots`
6. **Bots vs Πραγματικοί χρήστες** – `profiles.is_bot = true` vs `false`
7. **Referrals** – Χρήστες που ήρθαν μέσω `referred_by`

---

## Διαχείριση Χρηστών

8. **Επιβεβαιωμένοι χρήστες** – `profiles.is_verified = true`
9. **Τύπος καυσίμου** – Κατανομή `fuel_type` (petrol, diesel, electric, hybrid)
10. **Κρατήσεις που έληξαν** – Από `reserved_spots` όπου `expires_at < now()`

---

## Αναλυτικά & Reports

11. **Κουπόνια ανά κατηγορία** – Chart από `coupons.category`
12. **Parking history ανά status** – completed / cancelled κλπ
13. **Webhook events** – Πλήθος από `webhook_logs` ανά τύπο
14. **Rate limits** – Πλήθος από `rate_limits` (αν υπάρχει πρόβλημα)
15. **Θέσεις που προτιμούνται από φίλους** – `parking_spots.friends_priority` non-empty

---

## Νέα καρτέλα

16. **Κουπόνια** – Διαχείριση `coupons` και `coupon_redemptions`
17. **Δραστηριότητα** – Activity log από `parking_updates`, `notifications`
18. **Συντήρηση** – Καθαρισμός expired data, orphaned records κλπ
