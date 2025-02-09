import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { Delete, Edit } from "@mui/icons-material";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

interface Client {
  id: number;
  name: string;
  startDate: string;
  marketing: string;
  sessions: number;
  sessionPrice: number;
  paid: number;
  accountNumber: string;
  bank: string;
  phone: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b8b98",
    },
    secondary: {
      main: red[800],
    },
    background: {
      default: "#F2F2F2",
      paper: "#F2F2F2",
    },
  },
});

const initialClients: Client[] = [
  {
    id: 1,
    name: "أحمد محمد",
    startDate: "2024-02-10",
    marketing: "إعلان إنستجرام",
    sessions: 10,
    sessionPrice: 100,
    paid: 800,
    accountNumber: "1234567890",
    bank: "البنك الأهلي",
    phone: "0555555555",
  },
];

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [open, setOpen] = useState<boolean>(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAddClient = () => {
    setClients([
      ...clients,
      { id: clients.length + 1, ...newClient } as Client,
    ]);
    setOpen(false);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Typography variant="h4" align="center" sx={{ my: 2 }}>
            لوحة تحكم العملاء
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            إضافة عميل جديد
          </Button>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>اسم العميل</TableCell>
                  <TableCell>بداية الدورة</TableCell>
                  <TableCell>التسويق</TableCell>
                  <TableCell>عدد الحصص</TableCell>
                  <TableCell>قيمة الحصة</TableCell>
                  <TableCell>المسدد</TableCell>
                  <TableCell>البنك</TableCell>
                  <TableCell>رقم التليفون</TableCell>
                  <TableCell>الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.startDate}</TableCell>
                    <TableCell>{client.marketing}</TableCell>
                    <TableCell>{client.sessions}</TableCell>
                    <TableCell>{client.sessionPrice}</TableCell>
                    <TableCell>{client.paid}</TableCell>
                    <TableCell>{client.bank}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <Button color="primary" size="small">
                        <Edit />
                      </Button>
                      <Button color="secondary" size="small">
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>إضافة عميل جديد</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="اسم العميل"
                name="name"
                onChange={handleInputChange}
                sx={{ my: 1 }}
              />
              <TextField
                fullWidth
                label="بداية الدورة"
                name="startDate"
                type="date"
                onChange={handleInputChange}
                sx={{ my: 1 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="التسويق"
                name="marketing"
                onChange={handleInputChange}
                sx={{ my: 1 }}
              />
              <TextField
                fullWidth
                label="عدد الحصص"
                name="sessions"
                type="number"
                onChange={handleInputChange}
                sx={{ my: 1 }}
              />
              <TextField
                fullWidth
                label="قيمة الحصة"
                name="sessionPrice"
                type="number"
                onChange={handleInputChange}
                sx={{ my: 1 }}
              />
              <TextField
                fullWidth
                label="المسدد"
                name="paid"
                type="number"
                onChange={handleInputChange}
                sx={{ my: 1 }}
              />
              <TextField
                fullWidth
                label="البنك"
                name="bank"
                onChange={handleInputChange}
                sx={{ my: 1 }}
              />
              <TextField
                fullWidth
                label="رقم التليفون"
                name="phone"
                onChange={handleInputChange}
                sx={{ my: 1 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>إلغاء</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddClient}
              >
                إضافة
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}
