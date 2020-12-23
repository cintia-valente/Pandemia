import { Router } from 'express';
import auth from '../config/auth';
import * as atendimentoController from './atendimento.controller';
import * as authController from './auth.controller';
import * as pacienteController from './paciente.controller';
import * as unidadeController from './unidade.controller';

export const router = Router();
export const path = '';

export const router2 = Router();

router.get('/unidade', unidadeController.getUnidades);
router.get('/unidade/:unidid', unidadeController.getUnidadePorId);
router.get('/unidade/:unidnome', unidadeController.getUnidadePorNome);

router.get('/atendimento', atendimentoController.getAtendimentos);
router.get('/atendimento/:atendid', atendimentoController.getAtendimentoPorId);
router.get('/atendimentodeunidade/:unitid', atendimentoController.getAtendimentoPorUnidadeId);
router.get('/atendimentodetempo/:unitid', atendimentoController.getAtendimentoTempo);

router.get('/paciente', pacienteController.getPacientes);
router.get('/paciente/:pacienteid', pacienteController.getPacientePorId);
router.get('/pacientecpf/:cpf', pacienteController.getPacientePorCpf)

router.get('/authpaciente', authController.authMiddleware, pacienteController.getPacientes);
router.get('/tempo/:id', atendimentoController.getAtendimentoTempo);

router.post('/authunid', authController.authMiddleware, unidadeController.postUnidade);
router.post('/authatendimento', authController.authMiddleware, atendimentoController.postAtendimento);
router.post('/authpaciente', authController.authMiddleware, pacienteController.postPaciente);

router.patch('/unidade/:unidid', authController.authMiddleware, unidadeController.patchUnidade);
router.patch('/atendimento/:atendid', authController.authMiddleware, atendimentoController.patchAtendimento);

router.delete('/unidade/:unidid', authController.authMiddleware, unidadeController.deleteUnidade);
router.delete('/atendimento/:atendid', authController.authMiddleware, atendimentoController.deleteAtendimento);

router2.post('/auth/register', authController.postUser);
router.post('/auth/authenticate', authController.authUser);

router2.use(authController.authMiddleware);
router2.get('/auth/atendimento2', atendimentoController.getAtendimentos);