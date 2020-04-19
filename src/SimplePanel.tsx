import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';

interface Props extends PanelProps<SimpleOptions> {}

const LevelLabel: any = {
  warn: { Label: '建议', BgColor: '#FF9D00', Color: '#723b13' },
  risk: { Label: '警告', BgColor: '#FF9D00', Color: '#723b13' },
  serious: { Label: '严重', BgColor: '#e54545', Color: '#fff' },
  good: { Label: '正常', BgColor: '#0ABF5B', Color: '#fff' },
};

export class SimplePanel extends PureComponent<Props> {
  renderInfo(data: any, filed: string) {
    switch (filed) {
      case 'Level':
        return (
          <span style={{ backgroundColor: LevelLabel[data[filed]].BgColor, color: LevelLabel[data[filed]].Color, padding: '2px 8px' }}>
            {LevelLabel[data[filed]].Label}
          </span>
        );
      default:
        return <span>{data[filed]}</span>;
    }
  }

  render() {
    const { options, data, width, height } = this.props;
    console.log(options, data);

    // 这里应该改为由datasource数据转换来的值
    let mockData: any = {
      Title: '10.0.0.9配置过低',
      Level: 'warn',
      Description: 'Master(10.0.0.10) 7.41GB Memory 不足以支持 8 节点的集群',
      Reason: 'Master(10.0.0.10) 7.41GB Memory 不足以支持 8 节点的集群',
      Risk: 'Master节点配置过低可能导致在该节点的核心组件性能不足,导致集群响应速度下降',
      Proposal: '拥有 8 节点的集群至少需要 7.50GB Memory',
    };

    let infolist = [
      { name: 'Level', text: '异常级别' },
      { name: 'Description', text: '异常描述' },
      { name: 'Risk', text: '异常影响' },
      { name: 'Reason', text: '异常原因' },
      { name: 'Proposal', text: '修复建议' },
    ];

    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
          overflow: 'auto',
        }}
      >
        <p style={{ lineHeight: '30px', padding: '20px' }}>{mockData.Title}</p>
        {infolist.map(info => {
          return (
            <div
              key={info.name}
              style={{
                minHeight: '60px',
                width: '100%',
                fontSize: '14px',
                borderTop: '1px solid #ccc',
                padding: '0 20px',
                position: 'relative',
                clear: 'both',
              }}
            >
              <div style={{ float: 'left', minHeight: '60px', width: '100%', padding: `19px 0 19px ${options.labelWidth}px` }}>
                {this.renderInfo(mockData, info.name)}
              </div>
              <span style={{ float: 'left', fontWeight: 500, lineHeight: '60px', width: '150px', marginLeft: '-100%' }}>{info.text}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
