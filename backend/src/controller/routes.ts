import { Router } from 'express';
import auth from '../config/auth';
import * as atendimentoController from './atendimento.controller';
import * as authController from './auth.controller';
import * as pacienteController from './paciente.controller';
import * as unidadeController from './unidade.controller';

export const router = Router();
export const path = '';

export const router2 = Router();

router.get('unidade', unidadeController.getterUnits);
router.get('unidade/:unitid', unidadeController.getterUnitById);
router.get('/atendimento/:attid', atendimentoController.getterAttById);
router.get('/atendimento', atendimentoController.getterAllatendimento);
router.get('/atendimentoofunit/:unitid', atendimentoController.getteratendimentoByUnitId);

router.get('/paciente', pacienteController.getterpaciente);
router.get('/paciente/:pacienteid', pacienteController.getterpacienteById);
router.get('/pacientecpf/:cpf', pacienteController.getterpacienteBycpf)

router.get('/paciente', pacienteController.authMiddleware,api.getterpaciente);
router.get('/tempo/:id', atendimentoController.getterAttTime);


router.post('unidade', unidadeController.authMiddleware,api.createUnit);
router.post('/atendimento', atendimentoController.authMiddleware,api.createAtt);
router.post('/paciente', pacienteController.authMiddleware,api.createpaciente);

router.patch('unidade/:unitid', unidadeController.authMiddleware,api.patchUnit);
router.patch('/atendimento/:attid', atendimentoController.authMiddleware,api.patchAtt);

router.delete('unidade/:unitid', unidadeController.authMiddleware,api.deleteUnit);
router.delete('/atendimento/:attid', atendimentoController.authMiddleware, api.deleteUnit);

router2.post('/auth/register', authController.createUser);
router.post('/auth/authenticate', authController.authUser);

router2.use(authController.authMiddleware);
router2.get('/auth/atendimento2', authController.getterAllatendimento);