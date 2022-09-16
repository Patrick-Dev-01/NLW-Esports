import { useState } from 'react';
import { View, Text, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { Activity, CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps{
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props){
    const [isCopping, setIsCopping] = useState(false)
    
    async function handleCopyDiscordToClipboard(){
        setIsCopping(true)
        await Clipboard.setStringAsync(discord);

        Alert.alert('Discord Côpiado!', 'Usuário copiado para você colar no Discord')
        setIsCopping(false);
    }
    
    return (
        <Modal 
        animationType='fade'
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon}>
                        <MaterialIcons 
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                            onPress={onClose}
                        />
                    </TouchableOpacity>

                    <CheckCircle 
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                    />

                    <Heading 
                        title="Let's Play"
                        subtitle="Agora é só começar a jogar"
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipboard}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>    
        </Modal>
    );
}